import React, { useCallback, useEffect, useState } from 'react';

import CustomizationContainer from '../container/CustomizationContainer';
import VideoPlayerContainer from '../container/VideoPlayerContainer';

export const CustomizationGroup = Object.freeze({
    Content: 'Content',
    Presentation: 'Presentation',
});

export const ContentCustomization = Object.freeze({
    VideoLength: 'VideoLength',
    InformationPreference: 'InformationPreference',
});

export const PresentationCustomization = Object.freeze({
    Speed: 'Speed',
    Tone: 'Tone',
    Voice: 'Voice',
    Gender: 'Gender',
    Syntax: 'Syntax',
});

export const VideoLength = Object.freeze({
    Succinct: 'Succinct',
    Verbose: 'Verbose',
    VeryVerbose: 'VeryVerbose',
});

export const InformationPreference = Object.freeze({
    Activity: 'Activity',
    Person: 'Person',
    Object: 'Object',
    Setting: 'Setting',
});

export const Speed = Object.freeze({
    MIN: 0.5,
    MAX: 2,
    STEP: 0.25,
});

export const Tone = Object.freeze({
    Monotonous: 'Monotonous',
    Dynamic: 'Dynamic',
});

export const Voice = Object.freeze({
    Human: 'Human',
    Synthesizer: 'Synthesizer',
});

export const Gender = Object.freeze({
    Male: 'Male',
    Female: 'Female',
});

export const Syntax = Object.freeze({
    Past: 'Past',
    Present: 'Present',
});

function Dashboard() {
    const [customizationGroup, setCustomizationGroup] = useState(null);
    const [customization, setCustomization] = useState(null);
    const [videoLength, setVideoLength] = useState(VideoLength.Succinct);
    const [informationPreference, setInformationPreference] = useState(InformationPreference.Activity);
    const [speed, setSpeed] = useState(1);
    const [tone, setTone] = useState(Tone.Monotonous);
    const [voice, setVoice] = useState(Voice.Human);
    const [gender, setGender] = useState(Gender.Male);
    const [syntax, setSyntax] = useState(Syntax.Past);

    const getPreviousValue = useCallback((items, currentItem) => {
        const values = Object.values(items);
        const index = values.indexOf(currentItem);
        const nextIndex = index - 1 < 0 ? values.length -1 : index - 1;
        return values[nextIndex];
    }, []);

    const getNextValue = useCallback((items, currentItem) => {
        const values = Object.values(items);
        const index = values.indexOf(currentItem);
        const nextIndex = index + 1 < values.length ? index + 1 : 0;
        return values[nextIndex];
    }, []);

    const handleKeyPress = useCallback((event) => {
        let selected = null;
        switch (event.key) {
            case 'a':
                setCustomizationGroup(CustomizationGroup.Content);
                setCustomization(null);
                speechSynthesis.speak(new SpeechSynthesisUtterance('Content customization is selected.'));
                break;
            case 's':
                setCustomizationGroup(CustomizationGroup.Presentation);
                setCustomization(null);
                speechSynthesis.speak(new SpeechSynthesisUtterance('Presentation customization is selected.'));
                break;
            case 'ArrowUp':
                selected = (() => {
                    if (customizationGroup === CustomizationGroup.Content) {
                        return customization ? getPreviousValue(ContentCustomization, customization) : ContentCustomization.VideoLength;
                    } else if (customizationGroup === CustomizationGroup.Presentation) {
                        return customization ? getPreviousValue(PresentationCustomization, customization) : PresentationCustomization.Speed;
                    }
                    return null;
                })();
                setCustomization(selected);
                speechSynthesis.speak(new SpeechSynthesisUtterance(`${selected} is selected.`));
                break;
            case 'ArrowDown':
                selected = (() => {
                    if (customizationGroup === CustomizationGroup.Content) {
                        return customization ? getNextValue(ContentCustomization, customization) : ContentCustomization.VideoLength;
                    } else if (customizationGroup === CustomizationGroup.Presentation) {
                        return customization ? getNextValue(PresentationCustomization, customization) : PresentationCustomization.Speed;
                    }
                    return null;
                })();
                setCustomization(selected);
                speechSynthesis.speak(new SpeechSynthesisUtterance(`${selected} is selected.`));
                break;
            case 'ArrowLeft':
                if (customization === ContentCustomization.VideoLength) {
                    selected = videoLength ? getPreviousValue(VideoLength, videoLength) : VideoLength.Succinct;
                    setVideoLength(selected);
                } else if (customization === ContentCustomization.InformationPreference) {
                    selected = informationPreference ? getPreviousValue(InformationPreference, informationPreference) : InformationPreference.Activity;
                    setInformationPreference(selected);
                } else if (customization === PresentationCustomization.Speed && speed > Speed.MIN) {
                    const newSpeed = speed - Speed.STEP;
                    setSpeed(newSpeed);
                    speechSynthesis.speak(new SpeechSynthesisUtterance(`Speed is ${newSpeed}`));
                } else if (customization === PresentationCustomization.Tone) {
                    selected = tone ? getPreviousValue(Tone, tone) : Tone.Monotonous;
                    setTone(selected);
                } else if (customization === PresentationCustomization.Voice) {
                    selected = voice ? getPreviousValue(Voice, voice) : Voice.Human;
                    setVoice(selected);
                } else if (customization === PresentationCustomization.Gender) {
                    selected = gender ? getPreviousValue(Gender, gender) : Gender.Male;
                    setGender(selected);
                } else if (customization === PresentationCustomization.Syntax) {
                    selected = syntax ? getPreviousValue(Syntax, syntax) : Syntax.Past;
                    setSyntax(selected);
                }
                if (selected) {
                    speechSynthesis.speak(new SpeechSynthesisUtterance(`${selected} is selected.`));
                }
                break;
            case 'ArrowRight':
                if (customization === ContentCustomization.VideoLength) {
                    selected = videoLength ? getNextValue(VideoLength, videoLength) : VideoLength.Succinct;
                    setVideoLength(selected);
                } else if (customization === ContentCustomization.InformationPreference) {
                    selected = informationPreference ? getNextValue(InformationPreference, informationPreference) : InformationPreference.Activity;
                    setInformationPreference(selected);
                } else if (customization === PresentationCustomization.Speed && speed < Speed.MAX) {
                    const newSpeed = speed + Speed.STEP;
                    setSpeed(newSpeed);
                    speechSynthesis.speak(new SpeechSynthesisUtterance(`Speed is ${newSpeed}`));
                } else if (customization === PresentationCustomization.Tone) {
                    selected = tone ? getNextValue(Tone, tone) : Tone.Monotonous;
                    setTone(selected);
                } else if (customization === PresentationCustomization.Voice) {
                    selected = voice ? getNextValue(Voice, voice) : Voice.Human;
                    setVoice(selected);
                } else if (customization === PresentationCustomization.Gender) {
                    selected = gender ? getNextValue(Gender, gender) : Gender.Male;
                    setGender(selected);
                } else if (customization === PresentationCustomization.Syntax) {
                    selected = syntax ? getNextValue(Syntax, syntax) : Syntax.Past;
                    setSyntax(selected);
                }
                if (selected) {
                    speechSynthesis.speak(new SpeechSynthesisUtterance(`${selected} is selected.`));
                }
                break;
            default:
                break;
        }
    }, [getPreviousValue, getNextValue, customizationGroup, customization, videoLength, informationPreference, speed, tone, voice, gender, syntax]);

    useEffect(() => {
        // attach the event listener
        document.addEventListener('keydown', handleKeyPress);
    
        // remove the event listener
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    return (
        <div className='container'>
            <div className='columns'>
                <div className='column col-8'>
                    <VideoPlayerContainer videoLength={videoLength} speed={speed} />
                </div>
                <div className='column col-4'>
                    <CustomizationContainer
                        videoLength={videoLength}
                        informationPreference={informationPreference}
                        speed={speed}
                        tone={tone}
                        voice={voice}
                        gender={gender}
                        syntax={syntax}
                        onVideoLengthChange={setVideoLength}
                        onInformationPreferenceChange={setInformationPreference}
                        onSpeedChange={setSpeed}
                        onToneChange={setTone}
                        onVoiceChange={setVoice}
                        onGenderChange={setGender}
                        onSyntaxChange={setSyntax}
                    />
                </div>
                
            </div>
        </div>
    );
}

export default Dashboard;
