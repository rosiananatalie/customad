import React, { useState } from 'react';

import CustomizationContainer from '../container/CustomizationContainer';
import VideoPlayerContainer from '../container/VideoPlayerContainer';

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
    const [videoLength, setVideoLength] = useState(VideoLength.Succinct);
    const [informationPreference, setInformationPreference] = useState(InformationPreference.Activity);
    const [tone, setTone] = useState(Tone.Monotonous);
    const [voice, setVoice] = useState(Voice.Human);
    const [gender, setGender] = useState(Gender.Male);
    const [syntax, setSyntax] = useState(Syntax.Past);

    return (
        <div>
            <div className='container'>
                <div className='columns'>
                    <div className='column col-8'>
                        <VideoPlayerContainer />
                    </div>
                    <div className='column col-4'>
                        <CustomizationContainer
                            videoLength={videoLength}
                            informationPreference={informationPreference}
                            tone={tone}
                            voice={voice}
                            gender={gender}
                            syntax={syntax}
                            onVideoLengthChange={setVideoLength}
                            onInformationPreferenceChange={setInformationPreference}
                            onToneChange={setTone}
                            onVoiceChange={setVoice}
                            onGenderChange={setGender}
                            onSyntaxChange={setSyntax}
                        />
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
