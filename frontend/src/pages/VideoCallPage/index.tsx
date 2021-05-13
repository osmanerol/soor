import React, { useEffect, useState, useRef } from 'react';
import './index.scss';
import { Input, useToast, useDisclosure } from '@chakra-ui/react';
import { Container } from 'react-bootstrap';
import { Button, CommentModal } from '../../components/index';
import { IoVideocam, IoVideocamOff } from 'react-icons/io5';
import { IoMdMic, IoMdMicOff } from 'react-icons/io';
import { MdScreenShare, MdStopScreenShare } from 'react-icons/md';
import { VscChromeClose } from 'react-icons/vsc';
//import { useHistory, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { firestore } from '../../services/firebaseConfig';

const Index = () => {
    const [cameraSetting, setCameraSetting] = useState(false);
    const [audioSetting, setAudioSetting] = useState(false);
    const [screenShareSetting, setScreenShareSetting] = useState(false);
	const [idToCall, setIdToCall ] = useState<any>('');
	const [localStream, setLocalStream] = useState<any>(null);
    const [peerHasVideo, setPeerHasVideo] = useState<boolean>(false);
    let remoteStream : any = new MediaStream();
    const ownerVideo = useRef<any>();
	const peerVideo = useRef<any>();
    const history = useHistory();
    const toast = useToast();
    //const { callId } = useParams<{ callId : string}>(); 
    const { isOpen, onOpen, onClose } = useDisclosure();

    const servers = {
        iceServers: [
            {
                urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
            },
        ],
        iceCandidatePoolSize: 10,
    };

    const pc = useRef<any>(new RTCPeerConnection(servers));

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
                ownerVideo.current.srcObject = localStream;
                localStream.getTracks().forEach((track : any) => {
                    pc.current.addTrack(track, localStream);
                });
            }).catch(error => {
                toast({
                    title: 'Hata',
                    description: 'Kamera ve mikrofon ayarlarınızı tarayıcıdan açınız.',
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

    const makeOffer = async () => {
        const callDoc = firestore.collection('calls').doc();
        const offerCandidates = callDoc.collection('offerCandidates');
        const answerCandidates = callDoc.collection('answerCandidates');
        setIdToCall(callDoc.id);
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

    const answer = async () => {
        const callId = idToCall;
        const callDoc = firestore.collection('calls').doc(callId);
        const offerCandidates = callDoc.collection('offerCandidates');
        const answerCandidates = callDoc.collection('answerCandidates');
        pc.current.onicecandidate = (event : any) => {
          event.candidate && answerCandidates.add(event.candidate.toJSON());
        };
        const callData = (await callDoc.get()).data();
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
    
    const clickCameraButton = () => {
        setCameraSetting(!cameraSetting);
        let videoTracks = localStream.getVideoTracks(); 
        for(let i = 0; i < videoTracks.length; i++){
            videoTracks[i].enabled = !videoTracks[i].enabled;
        }
    }

    useEffect(() => {
        if(cameraSetting){
            ownerVideo.current.srcObject = localStream;
        }
    }, [cameraSetting, localStream])

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

    const clickCloseButton = () => {
        pc.current.close();
        if(localStorage.getItem('userType') === '1'){
            //setShowCommentModal(true);
            onOpen();
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

    return (
        <div className='video-call-page-container'>
            <Container>
                <div className="row">
                    <div className="col-6">
                        <Button onClick={makeOffer} text='Oda oluştur' />
                    </div>
                    <div className="col-6">
                        <div className="call-button">
                            <Button onClick={answer} text='cevapla' />
                        </div>
                    </div>
                    <div className="col-6">
                        <p>Call</p>
                        <Input
                            id="filled-basic"
                            value={idToCall}
                            onChange={(e) => setIdToCall(e.target.value)}
                        />
                    </div>
                </div>
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
            </Container>
            <CommentModal isOpen={isOpen} onClose={onClose} />    
        </div>
    );
};

export default Index;