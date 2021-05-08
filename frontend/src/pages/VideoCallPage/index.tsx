import React, { useEffect, useState, useRef } from 'react';
import './index.scss';
import { Input, useToast } from '@chakra-ui/react';
import { Container } from 'react-bootstrap';
import { Button } from '../../components/index';
import { IoVideocam, IoVideocamOff } from 'react-icons/io5';
import { IoMdMic, IoMdMicOff } from 'react-icons/io';
import { MdScreenShare, MdStopScreenShare } from 'react-icons/md';
import { VscChromeClose } from 'react-icons/vsc';
import { useHistory } from 'react-router-dom';
import firestore from '../../services/firebaseConfig';

const Index = () => {
    const toast = useToast();
    const [cameraSetting, setCameraSetting] = useState(true);
    const [audioSetting, setAudioSetting] = useState(true);
    const [shareScreenSetting, setScreenShareSetting] = useState(true);
    const [endCall, setEndCall] = useState(false);
    const history = useHistory();
    const [ me, setMe ] = useState<any>("");
	const [ receivingCall, setReceivingCall ] = useState<any>(false);
	const [ caller, setCaller ] = useState<any>("");
	const [ callerSignal, setCallerSignal ] = useState<any>();
	const [ callAccepted, setCallAccepted ] = useState<any>(false);
	const [ idToCall, setIdToCall ] = useState<any>("");
	const [ callEnded, setCallEnded] = useState<any>(false);
	const [ name, setName ] = useState<any>("");
    
	const [ localStream, setLocalStream ] = useState<any>();
    const ownerVideo = useRef<any>();
	const peerVideo = useRef<any>();
	const connectionRef= useRef<any>();
    const [isPermission, setIsPermission] = useState(false);
    let remoteStream : any = null;

    const servers = {
        iceServers: [
            {
                urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
            },
        ],
        iceCandidatePoolSize: 10,
    };

    const pc = useRef<any>(new RTCPeerConnection(servers));

    const startLocalVideo = async () => {
        /*
        await navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(streamData => {
            setStream(streamData);
            ownerVideo.current.srcObject = streamData;
            streamData.getTracks().forEach((track) => {
                pc.addTrack(track, streamData);
            });
        }) ;
        */
        remoteStream =  new MediaStream();
        pc.current.ontrack = (event : any) => {
            event.streams[0].getTracks().forEach((track : any) => {
                remoteStream.addTrack(track);
            });
        };
        peerVideo.current.srcObject = remoteStream;
    }

    const gotStream = () => {

    }

    const error = () => {
    }

    useEffect(() => {
        document.title = 'Soor - Arama';
        const getLocalStreamData = async () => {
            await navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(localStream => {
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
    }, [pc])

    const makeOffer = async () => {
        const callDoc = firestore.collection('calls').doc();
        const offerCandidates = callDoc.collection('offerCandidates');
        const answerCandidates = callDoc.collection('answerCandidates');
        setIdToCall(callDoc.id);
        pc.current.onicecandidate = (event : any) => {
            event.candidate && offerCandidates.add(event.candidate.toJSON());
            console.log('candidate save')
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
        const answerCandidates = callDoc.collection('answerCandidates');
        const offerCandidates = callDoc.collection('offerCandidates');
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
            console.log(change);
            if (change.type === 'added') {
              let data = change.doc.data();
              pc.current.addIceCandidate(new RTCIceCandidate(data));
            }
          });
        });
    }

    const answerCall =() =>  {
    }

    const leaveCall = () => {
    }

    const clickCameraButton = () => {
        setCameraSetting(!cameraSetting);
        localStream.getVideoTracks().forEach((track : any) => {
            track.stop();
        });
    }

    useEffect(() => {
    }, [cameraSetting])

    const clickVoiceButton = () => {
        setAudioSetting(!audioSetting);
    }

    const clickShareScreenButton = () => {
        setScreenShareSetting(!shareScreenSetting);
    }

    const clickCloseButton = () => {
        setEndCall(true);
        history.push('/');
    }

    return (
        <div className='video-call-page-container'>
            <Container>
                <div className="row">
                    <div className='col-4'>
                        <Button onClick={startLocalVideo} text='Başlat' />
                    </div>
                    <div className="col-4">
                        <Button onClick={makeOffer} text='Oda oluştur' />
                    </div>
                    <div className="col-4">
                        <div className="call-button">
                            {callAccepted && !callEnded ? (
                                <Button onClick={leaveCall} text='end call' />
                            ) : (
                                <Button onClick={answer} text='cevapla' />
                            )}
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
                    <div>
                        {receivingCall && !callAccepted ? (
                                <div className="caller">
                                <h1 >{name} is calling...</h1>
                                <Button  onClick={answerCall} text='answer' />
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className='media-views-container'>
                    <div className='media-items'>
                        <div className="peer-container">
                            {
                                true ?
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
                                localStream ? 
                                <video playsInline ref={ownerVideo} autoPlay /> :
                                <p className='text'>Veli Kurt</p>
                            }
                            {
                                localStream && 
                                <div className="name-container">
                                    <small className='name'>Veli Kurt</small>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className='settings'>
                    <div className="button-container">
                        <Button className="item" leftIcon={cameraSetting ? <IoVideocam /> : <IoVideocamOff />} onClick={clickCameraButton} />
                        <Button className="item" leftIcon={audioSetting ? <IoMdMic /> : <IoMdMicOff />} onClick={clickVoiceButton} />
                        <Button className="item" leftIcon={shareScreenSetting ? <MdScreenShare /> : <MdStopScreenShare />} onClick={clickShareScreenButton} />
                        <Button className="item item-cancel" leftIcon={<VscChromeClose />} showConfirm={true} confirmText='Görüşmeyi sonlandırmak istediğinizden emin misiniz ?' onClick={clickCloseButton} />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Index;

/*
import React, { useEffect, useState, useRef } from 'react';
import './index.scss';
import Peer from "simple-peer";
import io from "socket.io-client"
import { Input } from '@chakra-ui/react';
import { Container } from 'react-bootstrap';
import { Button } from '../../components/index';
import { IoVideocam, IoVideocamOff } from 'react-icons/io5';
import { IoMdMic, IoMdMicOff } from 'react-icons/io';
import { MdScreenShare, MdStopScreenShare } from 'react-icons/md';
import { VscChromeClose } from 'react-icons/vsc';
import { useHistory } from 'react-router-dom';

const socketURL = process.env.REACT_APP_SOCKET_URL;
const socket = io(`${socketURL}`);  

const Index = () => {
    const [cameraSetting, setCameraSetting] = useState(true);
    const [audioSetting, setAudioSetting] = useState(true);
    const [shareScreenSetting, setScreenShareSetting] = useState(true);
    const [endCall, setEndCall] = useState(false);
    const history = useHistory();
    const [ me, setMe ] = useState<any>("");
	const [ stream, setStream ] = useState<any>();
	const [ receivingCall, setReceivingCall ] = useState<any>(false);
	const [ caller, setCaller ] = useState<any>("");
	const [ callerSignal, setCallerSignal ] = useState<any>();
	const [ callAccepted, setCallAccepted ] = useState<any>(false);
	const [ idToCall, setIdToCall ] = useState<any>("");
	const [ callEnded, setCallEnded] = useState<any>(false);
	const [ name, setName ] = useState<any>("");
    const ownerVideo = useRef<any>();
	const peerVideo = useRef<any>();
	const connectionRef= useRef<any>();

    useEffect(() => {
        document.title = 'Soor - Arama';
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setStream(stream)
            ownerVideo.current.srcObject = stream
        })
        socket.on("me", (id) => {
            setMe(id)
        })
        socket.on("callUser", (data) => {
            setReceivingCall(true)
            setCaller(data.from)
            setName(data.name)
            setCallerSignal(data.signal)
        })
    }, [])

    const callUser = (id : any) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        })
        peer.on("signal", (data : any) => {
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name: name
            })
        })
        peer.on("stream", (stream) => {
            peerVideo.current.srcObject = stream
        })
        socket.on("callAccepted", (signal : any) => {
            setCallAccepted(true)
            peer.signal(signal)
        })
        connectionRef.current = peer
    }

    const answerCall =() =>  {
        setCallAccepted(true)
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        })
        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: caller })
        })
        peer.on("stream", (stream) => {
            peerVideo.current.srcObject = stream
        })
        peer.signal(callerSignal)
        connectionRef.current = peer
    }

    const leaveCall = () => {
        setCallEnded(true)
        connectionRef.current.destroy()
    }

    const clickCameraButton = () => {
        setCameraSetting(!cameraSetting);
    }

    useEffect(() => {
        }, [cameraSetting])

    const clickVoiceButton = () => {
        setAudioSetting(!audioSetting);
    }

    const clickShareScreenButton = () => {
        setScreenShareSetting(!shareScreenSetting);
    }

    const clickCloseButton = () => {
        setEndCall(true);
        history.push('/');
    }

    return (
        <div className='video-call-page-container'>
            <Container>
                <div className="row">
                    <div className="col-3">
                        <p>name</p>
                        <Input
                            id="filled-basic-2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ marginBottom: "20px" }}
                        />
                    </div>
                    <div className="col-3">
                        <p>{me}</p>
                    </div>
                    <div className="col-3">
                        <p>peer</p>
                        <Input
                            id="filled-basic"
                            value={idToCall}
                            onChange={(e) => setIdToCall(e.target.value)}
                        />
                    </div>
                    <div className="col-3">
                        <div className="call-button">
                            {callAccepted && !callEnded ? (
                                <Button onClick={leaveCall} text='end call' />
                            ) : (
                                <Button onClick={() => callUser(idToCall)} text='ara' />
                            )}
                        </div>
                    </div>
                    <div>
                        {receivingCall && !callAccepted ? (
                                <div className="caller">
                                <h1 >{name} is calling...</h1>
                                <Button  onClick={answerCall} text='answer' />
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className='media-views-container'>
                    <div className='media-items'>
                        <div className="peer-container">
                            {
                                callAccepted && !callEnded ?
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
                                stream ? 
                                <video playsInline ref={ownerVideo} autoPlay /> :
                                <p className='text'>Veli Kurt</p>
                            }
                            {
                                stream && 
                                <div className="name-container">
                                    <small className='name'>Veli Kurt</small>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className='settings'>
                    <div className="button-container">
                        <Button className="item" leftIcon={cameraSetting ? <IoVideocam /> : <IoVideocamOff />} onClick={clickCameraButton} />
                        <Button className="item" leftIcon={audioSetting ? <IoMdMic /> : <IoMdMicOff />} onClick={clickVoiceButton} />
                        <Button className="item" leftIcon={shareScreenSetting ? <MdScreenShare /> : <MdStopScreenShare />} onClick={clickShareScreenButton} />
                        <Button className="item item-cancel" leftIcon={<VscChromeClose />} showConfirm={true} confirmText='Görüşmeyi sonlandırmak istediğinizden emin misiniz ?' onClick={clickCloseButton} />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Index;

*/