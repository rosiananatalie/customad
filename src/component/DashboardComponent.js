import React, { useCallback, useEffect, useRef, useState } from 'react';

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

export const Content = Object.freeze({
    Succinct: 'inline',
    Verbose: 'verbose',
    VeryVerbose: 'veryVerbose',
    Activity: 'activity',
    Person: 'person',
    Object: 'object',
    Setting: 'setting',
});

export const VideoLength = Object.freeze({
    Succinct: 'inline',
    Verbose: 'verbose',
    VeryVerbose: 'veryVerbose',
});

export const InformationPreference = Object.freeze({
    Activity: 'activity',
    Person: 'person',
    Object: 'object',
    Setting: 'setting',
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
    Human: 'human',
    Synthesizer: 'syn',
});

export const Gender = Object.freeze({
    Male: 'male',
    Female: 'female',
});

export const Syntax = Object.freeze({
    Past: 'past',
    Present: 'present',
});

// https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/rate
export const utterThisProps = Object.freeze({
    rate: 2, // 0.1 ~ 10
    volume: 0.8, // 0 ~ 1
});

function Dashboard() {
    const [customizationGroup, setCustomizationGroup] = useState(null);
    const [customization, setCustomization] = useState(null);
    const [content, setContent] = useState(Content.Succinct);
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
            case 'a': {
                setCustomizationGroup(CustomizationGroup.Content);
                setCustomization(null);
                const utterThis = new SpeechSynthesisUtterance('Content customization is selected.');
                utterThis.rate = utterThisProps.rate;
                utterThis.volume = utterThisProps.volume;
                speechSynthesis.speak(utterThis);
                break;
            }
            case 's': {
                setCustomizationGroup(CustomizationGroup.Presentation);
                setCustomization(null);
                const utterThis = new SpeechSynthesisUtterance('Presentation customization is selected.');
                utterThis.rate = utterThisProps.rate;
                utterThis.volume = utterThisProps.volume;
                speechSynthesis.speak(utterThis);
                break;
            }
            case 'ArrowUp': {
                selected = (() => {
                    if (customizationGroup === CustomizationGroup.Content) {
                        return customization ? getPreviousValue(ContentCustomization, customization) : ContentCustomization.VideoLength;
                    } else if (customizationGroup === CustomizationGroup.Presentation) {
                        return customization ? getPreviousValue(PresentationCustomization, customization) : PresentationCustomization.Speed;
                    }
                    return null;
                })();
                setCustomization(selected);
                const utterThis = new SpeechSynthesisUtterance(`${selected} is selected.`);
                utterThis.rate = utterThisProps.rate;
                utterThis.volume = utterThisProps.volume;
                speechSynthesis.speak(utterThis);
                break;
            }
            case 'ArrowDown': {
                selected = (() => {
                    if (customizationGroup === CustomizationGroup.Content) {
                        return customization ? getNextValue(ContentCustomization, customization) : ContentCustomization.VideoLength;
                    } else if (customizationGroup === CustomizationGroup.Presentation) {
                        return customization ? getNextValue(PresentationCustomization, customization) : PresentationCustomization.Speed;
                    }
                    return null;
                })();
                setCustomization(selected);
                const utterThis = new SpeechSynthesisUtterance(`${selected} is selected.`);
                utterThis.rate = utterThisProps.rate;
                utterThis.volume = utterThisProps.volume;
                speechSynthesis.speak(utterThis);
                break;
            }
            case 'ArrowLeft':
                if (customization === ContentCustomization.VideoLength) {
                    selected = videoLength ? getPreviousValue(VideoLength, videoLength) : VideoLength.Succinct;
                    setVideoLength(selected);
                    setContent(selected);
                } else if (customization === ContentCustomization.InformationPreference) {
                    selected = informationPreference ? getPreviousValue(InformationPreference, informationPreference) : InformationPreference.Activity;
                    setInformationPreference(selected);
                    setContent(selected);
                } else if (customization === PresentationCustomization.Speed && speed > Speed.MIN) {
                    const newSpeed = speed - Speed.STEP;
                    setSpeed(newSpeed);
                    const utterThis = new SpeechSynthesisUtterance(`Speed is ${newSpeed}`);
                    utterThis.rate = utterThisProps.rate;
                    utterThis.volume = utterThisProps.volume;
                    speechSynthesis.speak(utterThis);
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
                    const utterThis = new SpeechSynthesisUtterance(`${selected} is selected.`);
                    utterThis.rate = utterThisProps.rate;
                    utterThis.volume = utterThisProps.volume;
                    speechSynthesis.speak(utterThis);
                }
                break;
            case 'ArrowRight':
                if (customization === ContentCustomization.VideoLength) {
                    selected = videoLength ? getNextValue(VideoLength, videoLength) : VideoLength.Succinct;
                    setVideoLength(selected);
                    setContent(selected);
                } else if (customization === ContentCustomization.InformationPreference) {
                    selected = informationPreference ? getNextValue(InformationPreference, informationPreference) : InformationPreference.Activity;
                    setInformationPreference(selected);
                    setContent(selected);
                } else if (customization === PresentationCustomization.Speed && speed < Speed.MAX) {
                    const newSpeed = speed + Speed.STEP;
                    setSpeed(newSpeed);
                    const utterThis = new SpeechSynthesisUtterance(`Speed is ${newSpeed}`);
                    utterThis.rate = utterThisProps.rate;
                    utterThis.volume = utterThisProps.volume;
                    speechSynthesis.speak(utterThis);
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
                    const utterThis = new SpeechSynthesisUtterance(`${selected} is selected.`);
                    utterThis.rate = utterThisProps.rate;
                    utterThis.volume = utterThisProps.volume;
                    speechSynthesis.speak(utterThis);
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
                    <VideoPlayerContainer
                        // videoLength={videoLength}
                        content={content}
                        speed={speed}
                        voice={voice}
                        gender={gender}
                        syntax={syntax}
                    />
                </div>
                <div className='column col-4'>
                    <CustomizationContainer
                        // videoLength={videoLength}
                        // informationPreference={informationPreference}
                        content={content}
                        speed={speed}
                        tone={tone}
                        voice={voice}
                        gender={gender}
                        syntax={syntax}
                        // onVideoLengthChange={setVideoLength}
                        // onInformationPreferenceChange={setInformationPreference}
                        onContentChange={setContent}
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
