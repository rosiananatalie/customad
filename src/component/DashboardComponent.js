import React, { useCallback, useEffect, useState } from 'react';

import CustomizationContainer from '../container/CustomizationContainer';
import VideoPlayerContainer from '../container/VideoPlayerContainer';

export const CustomizationGroup = Object.freeze({
    Content: 'content',
    Presentation: 'presentation',
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
    Succinct: 'succinct',
    Verbose: 'verbose',
    VeryVerbose: 'veryVerbose',
});

export const InformationPreference = Object.freeze({
    None: 'none',
    Activity: 'activity',
    Person: 'person',
    Object: 'object',
    Setting: 'setting',
});

export const Speed = Object.freeze({
    ID: 'speed',
    DEFAULT: 1,
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
    Present: 'present',
    Past: 'past',
});

// https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/rate
export const utterThisProps = Object.freeze({
    rate: 2, // 0.1 ~ 10
    volume: 0.6, // 0 ~ 1
});

function Dashboard() {
    const [isAudioDescriptionEnabled, setAudioDescriptionIsEnabled] = useState(true);
    const [customizationGroup, setCustomizationGroup] = useState(null);
    const [customization, setCustomization] = useState(null);
    const [videoLength, setVideoLength] = useState(VideoLength.Succinct);
    const [informationPreference, setInformationPreference] = useState(null);
    const [speed, setSpeed] = useState(Speed.DEFAULT);
    const [tone, setTone] = useState(Tone.Monotonous);
    const [voice, setVoice] = useState(Voice.Human);
    const [gender, setGender] = useState(Gender.Male);
    const [syntax, setSyntax] = useState(Syntax.Present);

    const handleKeyPress = useCallback((event) => {
        const BORDER_STYLE = '1px solid #0095B5';

        const getPreviousValue = (items, currentItem) => {
            const values = Object.values(items);
            const index = values.indexOf(currentItem);
            const nextIndex = index - 1 < 0 ? values.length -1 : index - 1;
            return values[nextIndex];
        };
    
        const getNextValue = (items, currentItem) => {
            const values = Object.values(items);
            const index = values.indexOf(currentItem);
            const nextIndex = index + 1 < values.length ? index + 1 : 0;
            return values[nextIndex];
        };

        const removeSelections = () => {
            const ids = [
                CustomizationGroup,
                ContentCustomization,
                PresentationCustomization,
                VideoLength,
                InformationPreference,
                Tone,
                Voice,
                Gender,
                Syntax,
            ].map(e => Object.values(e)).flat();
            ids.forEach((id) => {
                const element = document.getElementById(id)
                if (element) {
                    element.style.border = 'none';
                }
            });
            document.getElementById(Speed.ID).parentElement.style.border = 'none';
        };

        const utterThis = (text) => {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = utterThisProps.rate;
            utterance.volume = utterThisProps.volume;
            speechSynthesis.speak(utterance);
        };

        if (event.shiftKey) {
            switch (event.key.toLowerCase()) {
                case 'a': {
                    console.log(`a is pressed. (${new Date().toLocaleString()})`);
                    removeSelections();
                    setCustomizationGroup(CustomizationGroup.Content);
                    setCustomization(null);
                    utterThis('Content customization is selected.');
                    document.getElementById(CustomizationGroup.Content).style.border = BORDER_STYLE;
                    break;
                }
                case 's': {
                    console.log(`s is pressed. (${new Date().toLocaleString()})`);
                    removeSelections();
                    setCustomizationGroup(CustomizationGroup.Presentation);
                    setCustomization(null);
                    utterThis('Presentation customization is selected.');
                    document.getElementById(CustomizationGroup.Presentation).style.border = BORDER_STYLE;
                    break;
                }
                case 'arrowup': {
                    console.log(`arrow up is pressed. (${new Date().toLocaleString()})`);
                    removeSelections();
                    if (customizationGroup === CustomizationGroup.Content) {
                        const selected = customization ? getPreviousValue(ContentCustomization, customization) : ContentCustomization.VideoLength;
                        setCustomization(selected);
                        utterThis(`${selected} is selected.`);
                        document.getElementById(selected).style.border = BORDER_STYLE;
                    } else if (customizationGroup === CustomizationGroup.Presentation) {
                        const selected = customization ? getPreviousValue(PresentationCustomization, customization) : PresentationCustomization.Speed;
                        setCustomization(selected);
                        utterThis(`${selected} is selected.`);
                        document.getElementById(selected).style.border = BORDER_STYLE;
                    }
                    break;
                }
                case 'arrowdown': {
                    console.log(`arrow down is pressed. (${new Date().toLocaleString()})`);
                    removeSelections();
                    if (customizationGroup === CustomizationGroup.Content) {
                        const selected = customization ? getNextValue(ContentCustomization, customization) : ContentCustomization.VideoLength;
                        setCustomization(selected);
                        utterThis(`${selected} is selected.`);
                        document.getElementById(selected).style.border = BORDER_STYLE;
                    } else if (customizationGroup === CustomizationGroup.Presentation) {
                        const selected = customization ? getNextValue(PresentationCustomization, customization) : PresentationCustomization.Speed;
                        setCustomization(selected);
                        utterThis(`${selected} is selected.`);
                        document.getElementById(selected).style.border = BORDER_STYLE;
                    }
                    break;
                }
                case 'arrowleft': {
                    console.log(`arrow left is pressed. (${new Date().toLocaleString()})`);
                    removeSelections();
                    if (customization === ContentCustomization.VideoLength) {
                        const selected = videoLength ? getPreviousValue(VideoLength, videoLength) : VideoLength.Succinct;
                        setVideoLength(selected);
                        utterThis(`${selected} is selected.`);
                        document.getElementById(selected).style.border = BORDER_STYLE;
                    } else if (customization === ContentCustomization.InformationPreference) {
                        const selected = informationPreference ? getPreviousValue(InformationPreference, informationPreference) : InformationPreference.Activity;
                        setInformationPreference(selected);
                        if (selected === InformationPreference.None) {
                            utterThis('No information preference is selected.');
                        } else {
                            utterThis(`${selected} is selected.`);
                            document.getElementById(selected).style.border = BORDER_STYLE;
                        }
                    } else if (customization === PresentationCustomization.Speed && speed > Speed.MIN) {
                        const newSpeed = speed - Speed.STEP;
                        setSpeed(newSpeed);
                        utterThis(`Speed is ${newSpeed}`);
                        document.getElementById(Speed.ID).parentElement.style.border = BORDER_STYLE;
                    } else if (customization === PresentationCustomization.Tone) {
                        const selected = tone ? getPreviousValue(Tone, tone) : Tone.Monotonous;
                        setTone(selected);
                        utterThis(`${selected} is selected.`);
                        document.getElementById(selected).style.border = BORDER_STYLE;
                    } else if (customization === PresentationCustomization.Voice) {
                        const selected = voice ? getPreviousValue(Voice, voice) : Voice.Human;
                        setVoice(selected);
                        utterThis(`${selected} is selected.`);
                        document.getElementById(selected).style.border = BORDER_STYLE;
                    } else if (customization === PresentationCustomization.Gender) {
                        const selected = gender ? getPreviousValue(Gender, gender) : Gender.Male;
                        setGender(selected);
                        utterThis(`${selected} is selected.`);
                        document.getElementById(selected).style.border = BORDER_STYLE;
                    } else if (customization === PresentationCustomization.Syntax) {
                        const selected = syntax ? getPreviousValue(Syntax, syntax) : Syntax.Present;
                        setSyntax(selected);
                        utterThis(`${selected} is selected.`);
                        document.getElementById(selected).style.border = BORDER_STYLE;
                    }
                    break;
                }
                case 'arrowright': {
                    console.log(`arrow right is pressed. (${new Date().toLocaleString()})`);
                    removeSelections();
                    if (customization === ContentCustomization.VideoLength) {
                        const selected = videoLength ? getNextValue(VideoLength, videoLength) : VideoLength.Succinct;
                        setVideoLength(selected);
                        utterThis(`${selected} is selected.`);
                        document.getElementById(selected).style.border = BORDER_STYLE;
                    } else if (customization === ContentCustomization.InformationPreference) {
                        const selected = informationPreference ? getNextValue(InformationPreference, informationPreference) : InformationPreference.Activity;
                        setInformationPreference(selected);
                        if (selected === InformationPreference.None) {
                            utterThis('No information preference is selected.');
                        } else {
                            utterThis(`${selected} is selected.`);
                            document.getElementById(selected).style.border = BORDER_STYLE;
                        }
                    } else if (customization === PresentationCustomization.Speed && speed < Speed.MAX) {
                        const newSpeed = speed + Speed.STEP;
                        setSpeed(newSpeed);
                        utterThis(`Speed is ${newSpeed}`);
                        document.getElementById(Speed.ID).parentElement.style.border = BORDER_STYLE;
                    } else if (customization === PresentationCustomization.Tone) {
                        const selected = tone ? getNextValue(Tone, tone) : Tone.Monotonous;
                        setTone(selected);
                        utterThis(`${selected} is selected.`);
                        document.getElementById(selected).style.border = BORDER_STYLE;
                    } else if (customization === PresentationCustomization.Voice) {
                        const selected = voice ? getNextValue(Voice, voice) : Voice.Human;
                        setVoice(selected);
                        utterThis(`${selected} is selected.`);
                        document.getElementById(selected).style.border = BORDER_STYLE;
                    } else if (customization === PresentationCustomization.Gender) {
                        const selected = gender ? getNextValue(Gender, gender) : Gender.Male;
                        setGender(selected);
                        utterThis(`${selected} is selected.`);
                        document.getElementById(selected).style.border = BORDER_STYLE;
                    } else if (customization === PresentationCustomization.Syntax) {
                        const selected = syntax ? getNextValue(Syntax, syntax) : Syntax.Present;
                        setSyntax(selected);
                        utterThis(`${selected} is selected.`);
                        document.getElementById(selected).style.border = BORDER_STYLE;
                    }
                    break;
                }
                default:
                    break;
            }
        }
    }, [customizationGroup, customization, videoLength, informationPreference, speed, tone, voice, gender, syntax]);

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
                        isAudioDescriptionEnabled={isAudioDescriptionEnabled}                        
                        videoLength={videoLength}
                        informationPreference={informationPreference}
                        speed={speed}
                        voice={voice}
                        gender={gender}
                        syntax={syntax}
                    />
                </div>
                <div className='column col-4'>
                    <CustomizationContainer
                        isAudioDescriptionEnabled={isAudioDescriptionEnabled}
                        videoLength={videoLength}
                        informationPreference={informationPreference}
                        speed={speed}
                        tone={tone}
                        voice={voice}
                        gender={gender}
                        syntax={syntax}
                        onAudioDescriptionIsEnabledChange={setAudioDescriptionIsEnabled}                        
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
