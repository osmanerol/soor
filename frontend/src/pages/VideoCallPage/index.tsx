import React, { FC, useEffect, useState, useRef } from 'react';
import './index.scss';
import { inject, observer } from 'mobx-react';
import { useToast, useDisclosure } from '@chakra-ui/react';
import { Container } from 'react-bootstrap';
import { Button, CommentModal } from '../../components/index';
import { IoVideocam, IoVideocamOff } from 'react-icons/io5';
import { IoMdMic, IoMdMicOff } from 'react-icons/io';
import { MdScreenShare, MdStopScreenShare } from 'react-icons/md';
import { VscChromeClose } from 'react-icons/vsc';
import { useHistory, useParams } from 'react-router-dom';
import { firestore } from '../../services/firebaseConfig';
import InstructorStore from '../../application/instructor/store/instructorStore';
import StudentStore from '../../application/student/store/studentStore';

interface IDefaultProps{
    InstructorStore? : typeof InstructorStore,
    StudentStore? : typeof StudentStore
}

const Index : FC<IDefaultProps> = inject('InstructorStore', 'StudentStore')(observer((props : IDefaultProps) => {
    const { InstructorStore : instructorStore, StudentStore : studentStore } = props;
    const [cameraSetting, setCameraSetting] = useState(false);
    const [audioSetting, setAudioSetting] = useState(false);
    const [screenShareSetting, setScreenShareSetting] = useState(false);
    const [showPreview, setShowPreview] = useState<boolean>(true);
	const [localStream, setLocalStream] = useState<any>(null);
    const [peerHasVideo, setPeerHasVideo] = useState<boolean>(false);
    let remoteStream : any = new MediaStream();
    const ownerVideo = useRef<any>();
    const previewVideo = useRef<any>();
	const peerVideo = useRef<any>();
    const history = useHistory();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { callId } = useParams<{ callId : string}>();

    const servers = {
        iceServers: [
            {
                urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
            },
        ],
        iceCandidatePoolSize: 10,
    };

    const pc = useRef<any>(new RTCPeerConnection(servers));

    // listen peer connection disconnected or not
    pc.current.oniceconnectionstatechange = () => {
        if(pc.current.iceConnectionState === 'disconnected') {
            // peer baglantisi kesildi
            clickCloseButton();
        }
    }

    useEffect(() => {
        document.title = 'Soor - Arama';
        const getLocalStreamData = async () => {
            await navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(localStream => {
                setCameraSetting(true);
                setAudioSetting(true);
                setLocalStream(localStream);
                previewVideo.current.srcObject = localStream;
            }).catch(error => {
                toast({
                    title: 'Hata',
                    description: 'Tarayıcınızın kamera ve mikrofon ayarlarına izin veriniz.',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            }) ;
        } 
        getLocalStreamData();

    }, [toast])

    // get peer's media stream
    pc.current.ontrack = (event : any) => {
        event.streams[0].getTracks().forEach((track : any) => {
            remoteStream.addTrack(track);
            if(track.kind === 'video' && track.enabled){
                setPeerHasVideo(true);
                peerVideo.current.srcObject = remoteStream;
            }
        });
    };

    const makeOffer = async (callDoc : any, offerCandidates : any, answerCandidates : any) => {
        pc.current.onicecandidate = (event : any) => {
            event.candidate && offerCandidates.add(event.candidate.toJSON());
        };
        const offerDescription = await pc.current.createOffer();
        await pc.current.setLocalDescription(offerDescription);
        const offer = {
            sdp: offerDescription.sdp,
            type: offerDescription.type,
        };
        await callDoc.set({ offer });
        callDoc.onSnapshot((snapshot : any) => {
            const data = snapshot.data();
            if (!pc.current.currentRemoteDescription && data?.answer) {
                const answerDescription = new RTCSessionDescription(data.answer);
                pc.current.setRemoteDescription(answerDescription);
            }   
        });        
        answerCandidates.onSnapshot((snapshot : any) => {
            snapshot.docChanges().forEach((change : any) => {
            if (change.type === 'added') {
                const candidate = new RTCIceCandidate(change.doc.data());
                pc.current.addIceCandidate(candidate);
            }
            });
        });
    }

    const answer = async (callDoc : any, callData : any, offerCandidates : any, answerCandidates : any) => {
        pc.current.onicecandidate = (event : any) => {
            event.candidate && answerCandidates.add(event.candidate.toJSON());
        };
        const offerDescription = callData!.offer;
        await pc.current.setRemoteDescription(new RTCSessionDescription(offerDescription));
        const answerDescription = await pc.current.createAnswer();
        await pc.current.setLocalDescription(answerDescription);
        const answer = {
          type: answerDescription.type,
          sdp: answerDescription.sdp,
        };
        await callDoc.update({ answer });
        offerCandidates.onSnapshot((snapshot : any) => {
          snapshot.docChanges().forEach((change : any) => {
            if (change.type === 'added') {
              let data = change.doc.data();
              pc.current.addIceCandidate(new RTCIceCandidate(data));
            }
          });
        });
    }

    const joinCall = async () => {
        setShowPreview(false);
        localStream.getTracks().forEach((track : any) => {
            pc.current.addTrack(track, localStream);
        });
        const callDoc = firestore.collection('calls').doc(callId);
        const offerCandidates = callDoc.collection('offerCandidates');
        const answerCandidates = callDoc.collection('answerCandidates');
        const callData = (await callDoc.get()).data();
        if(callData){
            answer(callDoc, callData, offerCandidates, answerCandidates);
        }
        else{
            makeOffer(callDoc, offerCandidates, answerCandidates);
        }
    }

    useEffect(() => {
        if(!showPreview){
            ownerVideo.current.srcObject = localStream;
        }
    }, [showPreview, localStream])
    
    const clickCameraButton = () => {
        setCameraSetting(!cameraSetting);
        let videoTracks = localStream.getVideoTracks(); 
        for(let i = 0; i < videoTracks.length; i++){
            videoTracks[i].enabled = !videoTracks[i].enabled;
        }
    }

    useEffect(() => {
        if(!showPreview){
            if(cameraSetting){
                ownerVideo.current.srcObject = localStream;
            }
        }
    }, [cameraSetting, localStream, showPreview])

    const clickAudioButton = () => {
        setAudioSetting(!audioSetting);
        let audioTracks = localStream.getAudioTracks();
        for(let i = 0; i < audioTracks.length; i++){
            audioTracks[i].enabled = !audioTracks[i].enabled;
        }
    } 
    
    const clickShareScreenButton = () => {
        setScreenShareSetting(!screenShareSetting);
    }

    const leaveCall = async () => {
        //Stop track local stream if there is any
        if (localStream){
            localStream.getTracks().forEach((track : any) => {
                track.stop();
            });
        }
        //Stop track remote stream if there is any
        if(remoteStream){
            remoteStream.getTracks().forEach((track : any) => {
                track.stop();
            });
        }
        //Close peer connection
        if(pc) {
            pc.current.close();
        }
        //Delete call document from db
        if(callId) {
            const callDoc = firestore.collection('calls').doc(callId);
            callDoc.delete();
        }
    }

    const clickCloseButton = async () => {
        await leaveCall();
        if(localStorage.getItem('userType') === '1'){
            onOpen();
            let lessonPrice = localStorage.getItem('lessonPrice');
            if(lessonPrice){
                await studentStore?.updateStudentCredit(parseInt(lessonPrice));
                localStorage.removeItem('lessonPrice');
            }
        }
        else if(localStorage.getItem('userType') === '2'){
            await instructorStore?.updateInstructorBalance();
        }
        else{
            toast({
                title: 'Bilgi',
                description: 'Görüşme sonlandı. Anasayfaya yönlendiriliyorsunuz.',
                status: 'info',
                duration: 2000,
                isClosable: true,
            });
            setTimeout(()=>{
                history.push('/');
            }, 2000)
        }
    }

    useEffect(() => {
        return () => {
            clickCloseButton();
        }
    }, [])

    return (
        <div className='video-call-page-container'>
            <Container>
                {
                    showPreview ?
                    <div className="preview-container">
                        <div>
                            <div className="owner-container">
                                {
                                    cameraSetting ? 
                                    <>
                                        <video playsInline ref={previewVideo} className='video-element' muted={true} autoPlay /> 
                                    </> :
                                    <p className='text'>Veli Kurt</p> 
                                }
                            </div>
                            <Button text='Görüşmeye katıl' className='text-center' disabled={!cameraSetting} onClick={joinCall} />
                        </div>
                    </div> :
                    <>
                        <div className='media-views-container'>
                            <div className='media-items'>
                                <div className="peer-container">
                                    {
                                        peerHasVideo ?
                                        <>
                                            <video playsInline ref={peerVideo} autoPlay />
                                            <div className="name-container">
                                                <small className='name'>Veli Kurt</small>
                                            </div>
                                        </> :
                                        <p className='text'>Ali Kurt</p>
                                    }
                                </div>
                                <div className="owner-container">
                                    {
                                        cameraSetting ? 
                                        <>
                                            <video playsInline ref={ownerVideo} className='video-element' muted={true} autoPlay /> 
                                            <div className="name-container">
                                                <small className='name'>Veli Kurt</small>
                                            </div>
                                        </> :
                                        <p className='text'>Veli Kurt</p> 
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='settings'>
                            <div className="button-container">
                                <Button className="item" leftIcon={cameraSetting ? <IoVideocam /> : <IoVideocamOff />} onClick={clickCameraButton} />
                                <Button className="item" leftIcon={audioSetting ? <IoMdMic /> : <IoMdMicOff />} onClick={clickAudioButton} />
                                <Button className="item" leftIcon={screenShareSetting ? <MdScreenShare /> : <MdStopScreenShare />} onClick={clickShareScreenButton} />
                                <Button className="item item-cancel" leftIcon={<VscChromeClose />} showConfirm={true} confirmText='Görüşmeyi sonlandırmak istediğinizden emin misiniz ?' onClick={clickCloseButton} />
                            </div>
                        </div>
                    </>
                }
                <CommentModal isOpen={isOpen} onClose={onClose} />   
            </Container> 
        </div>
    );
}));

export default Index;