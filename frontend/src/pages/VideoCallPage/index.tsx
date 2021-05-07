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