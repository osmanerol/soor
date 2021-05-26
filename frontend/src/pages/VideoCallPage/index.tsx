import React, { FC, useEffect, useState, useRef } from 'react';
import './index.scss';
import axios from 'axios';
import { inject, observer } from 'mobx-react';
import { useToast, useDisclosure } from '@chakra-ui/react';
import { Container } from 'react-bootstrap';
import { Button, CommentModal } from '../../components/index';
import { IoVideocam, IoVideocamOff } from 'react-icons/io5';
import { IoMdMic, IoMdMicOff } from 'react-icons/io';
import { MdScreenShare, MdStopScreenShare, MdFileDownload } from 'react-icons/md';
import { VscChromeClose } from 'react-icons/vsc';
import { useHistory, useParams } from 'react-router-dom';
import { firestore, storage } from '../../services/firebaseConfig';
import fileDownload from 'js-file-download';
import LessonStore from '../../application/lesson/store/lessonStore';
import InstructorStore from '../../application/instructor/store/instructorStore';

interface IDefaultProps{
    LessonStore? : typeof LessonStore,
    InstructorStore? : typeof InstructorStore,
}

const Index : FC<IDefaultProps> = inject('LessonStore', 'InstructorStore')(observer((props : IDefaultProps) => {
    const { InstructorStore : instructorStore, LessonStore : lessonStore } = props;
    const [cameraSetting, setCameraSetting] = useState(false);
    const [audioSetting, setAudioSetting] = useState(false);
    const [screenShareSetting, setScreenShareSetting] = useState(false);
    const [showPreview, setShowPreview] = useState<boolean>(true);
	const [localStream, setLocalStream] = useState<any>(null);
    const [peerHasVideo, setPeerHasVideo] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(0);
    const [ownerName, setOwnerName] = useState<string>('');
    const [peerName, setPeerName] = useState<string>('');
    let remoteStream : any = new MediaStream();
    const ownerVideo = useRef<any>();
    const previewVideo = useRef<any>();
	const peerVideo = useRef<any>();
    const senders = useRef<any>([]);
    const history = useHistory();
    const toast = useToast();
    const increment = useRef<any>();
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
        }
        if(localStorage.getItem('userType') === '2'){
            await instructorStore!.updateStatus(1);
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

    // listen peer connection disconnected or not
    pc.current.oniceconnectionstatechange = async () => {
        if(pc.current.iceConnectionState === 'connected'){
            startTime();
            await lessonStore?.updateLessonStatus(lessonStore!.lesson.id!, 1, 2);
            await lessonStore?.updateLessonStatus(lessonStore!.lesson.id!, 2, 2);
        }
        if(pc.current.iceConnectionState === 'disconnected') {
            // peer baglantisi kesildi
            clickCloseButton();
            stopTime();
        }
    }

    useEffect(() => {
        if(timer === 540){
            toast({
                title: 'Bilgi',
                description: 'Görüşme bir dakika sonra sonlanacaktır.',
                status: 'info',
                duration: 2000,
                isClosable: true,
            });
        }
        if(timer === 600){
            clearInterval(increment.current);
            clickCloseButton();
        }
    }, [timer, toast])

    const startTime = () => {
        increment.current = setInterval(() => {
            setTimer((timer : number) => timer+1);
        }, 1000);
    }
    
    const stopTime = () => {
        clearInterval(increment.current);
    }

    const formatTime = () => {
        const getSeconds = ("0" + timer % 60).slice(-2);
        const minutes = Math.floor(timer / 60);
        const getMinutes = ("0" + minutes % 60).slice(-2);
        return `${getMinutes} : ${getSeconds}`;
    }

    window.onpopstate = () => {
        clickCloseButton();
    }

    useEffect(() => {
        document.title = 'Soor - Arama';
        const getLesson = async () => {
            await lessonStore!.createLesson();
            await lessonStore!.getLesson(callId);
            if (lessonStore!.lesson.id !== 0) {
                if (lessonStore!.lesson.instructorStatus === 2 || lessonStore!.lesson.studentStatus === 2) {
                    toast({
                        title: 'Bilgi',
                        description: 'Link aktif veya doğru değil.',
                        status: 'info',
                        duration: 2000,
                        isClosable: true,
                    });
                    setTimeout(()=>{
                        history.push('/');
                    }, 2000)
                }
                else {
                    // get navigator media
                    await navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(localStream => {
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
                    if(localStorage.getItem('userType') === '1'){
                        setOwnerName(lessonStore!.lesson.student.first_name + ' ' + lessonStore!.lesson.student.last_name);
                        setPeerName(lessonStore!.lesson.instructor.first_name + ' ' + lessonStore!.lesson.instructor.last_name);
                    }
                    else if(localStorage.getItem('userType') === '2'){
                        setOwnerName(lessonStore!.lesson.instructor.first_name + ' ' + lessonStore!.lesson.instructor.last_name);
                        setPeerName(lessonStore!.lesson.student.first_name + ' ' + lessonStore!.lesson.student.last_name);
                    }
                }
            }
            else {
                await leaveCall();
                if (localStorage.getItem('userType') === '2') {
                    instructorStore!.updateStatus(1);
                }
                toast({
                    title: 'Bilgi',
                    description: 'Link aktif veya doğru değil.',
                    status: 'info',
                    duration: 2000,
                    isClosable: true,
                });
                setTimeout(async ()=>{
                    history.push('/');
                }, 2000)
            }
        }
        getLesson();
    }, [toast])
    
    // to get lesson information
    useEffect(() => {
    }, [callId, lessonStore, history, instructorStore])


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
            senders.current.push(pc.current.addTrack(track, localStream));
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
    
    const clickShareScreenButton = async () => {
        setScreenShareSetting(true);
        //@ts-ignore
        await navigator.mediaDevices.getDisplayMedia({cursor: true}).then((stream : any) => {
            let screenTrack = stream.getTracks()[0];
            if(screenTrack){
                senders.current.find((sender : any) => sender.track.kind === 'video').replaceTrack(screenTrack);
                screenTrack.onended = () => {
                    senders.current.find((sender : any) => sender.track.kind === 'video').replaceTrack(localStream.getVideoTracks()[0]);
                    setScreenShareSetting(false);
                }
            }
        })
    }
    
    const downloadImage = () => {
        axios.get(lessonStore!.lesson.image, {
            responseType : 'blob'
        }).then((response : any) => {
            fileDownload(response.data, `${peerName}.jpg`);
        })
    }

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
                                    <p className='text'>{ ownerName }</p> 
                                }
                            </div>
                            <Button text='Görüşmeye katıl' className='text-center' disabled={!cameraSetting} onClick={joinCall} />
                        </div>
                    </div> :
                    <>
                        <div className='timer'>
                            { formatTime() }
                        </div>
                        <div className='media-views-container'>
                            <div className='media-items'>
                                <div className="peer-container">
                                    {
                                        peerHasVideo ?
                                        <>
                                            <video playsInline ref={peerVideo} autoPlay />
                                            <div className="name-container">
                                                <small className='name'>{ peerName }</small>
                                            </div>
                                        </> :
                                        <p className='text'>{ peerName }</p>
                                    }
                                </div>
                                <div className="owner-container">
                                    {
                                        cameraSetting ? 
                                        <>
                                            <video playsInline ref={ownerVideo} className='video-element' muted={true} autoPlay /> 
                                            <div className="name-container">
                                                <small className='name'>{ ownerName }</small>
                                            </div>
                                        </> :
                                        <p className='text'>{ ownerName }</p> 
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='settings'>
                            <div className="button-container">
                                <Button className="item" leftIcon={cameraSetting ? <IoVideocam /> : <IoVideocamOff />} onClick={clickCameraButton} />
                                <Button className="item" leftIcon={audioSetting ? <IoMdMic /> : <IoMdMicOff />} onClick={clickAudioButton} />
                                <Button className="item" leftIcon={!screenShareSetting ? <MdScreenShare /> : <MdStopScreenShare />} onClick={clickShareScreenButton} disabled={screenShareSetting} />
                                <Button className="item" leftIcon={<MdFileDownload />} onClick={downloadImage} disabled={lessonStore!.lesson.image === ''} />
                                <Button className="item item-cancel" leftIcon={<VscChromeClose />} showConfirm={true} confirmText='Görüşmeyi sonlandırmak istediğinizden emin misiniz ?' onClick={clickCloseButton} />
                            </div>
                        </div>
                    </>
                }
                <CommentModal isOpen={isOpen} onClose={onClose} student={lessonStore!.lesson.student.id} instructor={lessonStore!.lesson.instructor.id} />   
            </Container> 
        </div>
    );
}));

export default Index;