import React, { useEffect, useState } from 'react';
import './index.scss';
import { Container } from 'react-bootstrap';
import { Button } from '../../components/index';
import { IoVideocam, IoVideocamOff } from 'react-icons/io5';
import { IoMdMic, IoMdMicOff } from 'react-icons/io';
import { MdScreenShare, MdStopScreenShare } from 'react-icons/md';
import { VscChromeClose } from 'react-icons/vsc';
import { useHistory } from 'react-router-dom';

const Index = () => {
    const [cameraSetting, setCameraSetting] = useState(true);
    const [voiceSetting, setVoiceSetting] = useState(true);
    const [shareScreenSetting, setScreenShareSetting] = useState(true);
    const [endCall, setEndCall] = useState(false);
    const history = useHistory();

    useEffect(() => {
        document.title = 'Soor - Arama';
    }, [])

    const clickCameraButton = () => {
        setCameraSetting(!cameraSetting);
    }

    const clickVoiceButton = () => {
        setVoiceSetting(!voiceSetting);
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
                <div className="name-container">
                    <p className='text'>Ali Kurt</p>
                </div>
                <div className='media-views-container'>
                    <div className='media-items'>
                        <div className="owner-container">
                            <img src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTJ8fGdpcmx8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="caller-video"/>
                        </div>
                        <div className="caller-container">
                            <img src="https://images.unsplash.com/photo-1543965170-4c01a586684e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fG1hbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" className="caller-container" alt="caller-video"/>
                        </div>
                    </div>
                </div>
                <div className='settings'>
                    <div className="button-container">
                        <Button className="item" leftIcon={cameraSetting ? <IoVideocam /> : <IoVideocamOff />} onClick={clickCameraButton} />
                        <Button className="item" leftIcon={voiceSetting ? <IoMdMic /> : <IoMdMicOff />} onClick={clickVoiceButton} />
                        <Button className="item" leftIcon={shareScreenSetting ? <MdScreenShare /> : <MdStopScreenShare />} onClick={clickShareScreenButton} />
                        <Button className="item item-cancel" leftIcon={<VscChromeClose />} showConfirm={true} confirmText='Görüşmeyi sonlandırmak istediğinizden emin misiniz ?' onClick={clickCloseButton} />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Index;