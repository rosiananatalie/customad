import React, { useCallback, useEffect } from "react";
import { ToggleAudioDescription, CustomizationGroup, ContentCustomization, PresentationCustomization, VideoLength, InformationPreference, Speed, Tone, Voice, Gender, Syntax } from "./DashboardComponent";
import { log } from '../Utils';

function CustomizationComponentForm({
    isCustomisable,
    isAudioDescriptionEnabled,
    videoLength,
    informationPreference,
    speed,
    tone,
    voice,
    gender,
    syntax,
    onAudioDescriptionIsEnabledChange,
    onVideoLengthChange,
    onInformationPreferenceChange,
    onSpeedChange,
    onToneChange,
    onVoiceChange,
    onGenderChange,
    onSyntaxChange,
}) {
    const handleAudioDescriptionIsEnabledChange = useCallback((event) => {
        const value = event.target.checked;
        console.log('Audio description is ' + (value ? 'enabled' : 'disabled'));
        onAudioDescriptionIsEnabledChange(value);
    }, [onAudioDescriptionIsEnabledChange]);

    const handleVideoLengthChange = useCallback((event) => {
        const value = event.target.value;
        log('Length is set to ' + value);
        onVideoLengthChange(value);
    }, [onVideoLengthChange]);

    const handleInformationPreferenceChange = useCallback((event) => {
        const value = informationPreference === event.target.value ? null : event.target.value;
        log('Information preference is set to ' + value);
        onInformationPreferenceChange(value);
    }, [informationPreference, onInformationPreferenceChange]);

    const handleSpeedChange = useCallback((event) => {
        const value = Number(event.target.value);
        log('Speed is set to ' + value);
        onSpeedChange(value);
    }, [onSpeedChange]);

    const handleToneChange = useCallback((event) => {
        const value = event.target.value;
        log('Tone is set to ' + value);
        onToneChange(value);
    }, [onToneChange]);

    const handleVoiceChange = useCallback((event) => {
        const value = event.target.value;
        onVoiceChange(value);
        if (value === Voice.Synthesizer) {
            log('Voice is set to synthesizer')
            document.getElementById(Tone.Monotonous).click();
            Object.values(Tone).forEach(tone => document.getElementById(tone).disabled = true);
        } else {
            log('Voice is set to ' + value)
            Object.values(Tone).forEach(tone => document.getElementById(tone).disabled = false);
        }
    }, [onVoiceChange]);

    const handleGenderChange = useCallback((event) => {
        const value = event.target.value;
        log('Gender is set to ' + value);
        onGenderChange(value);
    }, [onGenderChange]);

    const handleSyntaxChange = useCallback((event) => {
        const value = event.target.value;
        log('Syntax is set to ' + value);
        onSyntaxChange(value);
    }, [onSyntaxChange]);

    useEffect(() => {
        onAudioDescriptionIsEnabledChange(true);
        onVideoLengthChange(VideoLength.Succinct);
        onInformationPreferenceChange(null);
        onSpeedChange(Speed.DEFAULT);
        onToneChange(Tone.Monotonous);
        onVoiceChange(Voice.Human);
        onGenderChange(Gender.Male);
        onSyntaxChange(Syntax.Present);
    }, [
        isCustomisable,
        onAudioDescriptionIsEnabledChange,
        onVideoLengthChange,
        onInformationPreferenceChange,
        onSpeedChange,
        onToneChange,
        onVoiceChange,
        onGenderChange,
        onSyntaxChange,
    ]);

    const audioDescriptionToggleLabel = isAudioDescriptionEnabled ? 'Audio Description ON' : 'Audio Description OFF';

    return (
        <div id="customization-form-component">
            <h1>Customization Setups</h1>
            <form className="form-horizontal">
                <div className="form-group">
                    <label className="form-switch">
                        <input
                            id={ToggleAudioDescription.ID}
                            type="checkbox"
                            checked={isAudioDescriptionEnabled}
                            onChange={handleAudioDescriptionIsEnabledChange}
                            disabled={!isCustomisable}
                        />
                        <i className="form-icon"></i> {audioDescriptionToggleLabel}
                    </label>
                </div>
                <div>
                    <h2 id={CustomizationGroup.Content}>Content Customization</h2>
                </div>
                <div className="form-group">
                    {/* Length Customization */}
                    <div className="col-3 col-sm-12">
                        <label id={ContentCustomization.VideoLength} className="form-label" htmlFor="length">Length</label>
                    </div>
                    <div className="col-9 col-sm-12">
                        <label className="form-radio form-inline">
                            <input
                                id={VideoLength.Succinct} 
                                type="radio"
                                name="length"
                                value={VideoLength.Succinct}
                                checked={videoLength === VideoLength.Succinct}
                                onChange={handleVideoLengthChange}
                                disabled={!isCustomisable}
                            />
                            <i className="form-icon"></i> Succinct
                        </label>
                        <label className="form-radio form-inline">
                            <input
                                id={VideoLength.Verbose}
                                type="radio"
                                name="length"
                                value={VideoLength.Verbose}
                                checked={videoLength === VideoLength.Verbose}
                                onChange={handleVideoLengthChange}
                                disabled={!isCustomisable}
                            />
                            <i className="form-icon"></i> Verbose
                        </label>
                        <label className="form-radio form-inline">
                            <input
                                id={VideoLength.VeryVerbose}
                                type="radio"
                                name="length"
                                value={VideoLength.VeryVerbose}
                                checked={videoLength === VideoLength.VeryVerbose}
                                onChange={handleVideoLengthChange}
                                disabled={!isCustomisable}
                            />
                            <i className="form-icon"></i> Very Verbose
                        </label>
                    </div>

                    {/* Information Preference Customization */}
                    <div className="col-3 col-sm-12">
                        <label id={ContentCustomization.InformationPreference} className="form-label" htmlFor="preference">Information Preference</label>
                    </div>
                    <div className="col-9 col-sm-12">
                        <label className="form-checkbox form-inline">
                            <input
                                id={InformationPreference.Activity}
                                type="checkbox"
                                name="preference"
                                value={InformationPreference.Activity}
                                checked={informationPreference === InformationPreference.Activity}
                                onChange={handleInformationPreferenceChange}
                                disabled={!isCustomisable}
                            />
                            <i className="form-icon"></i> Activity
                        </label>
                        <label className="form-checkbox form-inline">
                            <input
                                id={InformationPreference.Person}
                                type="checkbox"
                                name="preference"
                                value={InformationPreference.Person}
                                checked={informationPreference === InformationPreference.Person}
                                onChange={handleInformationPreferenceChange}
                                disabled={!isCustomisable}
                            />
                            <i className="form-icon"></i> Person
                        </label>
                        <label className="form-checkbox form-inline">
                            <input
                                id={InformationPreference.Object}
                                type="checkbox"
                                name="preference"
                                value={InformationPreference.Object}
                                checked={informationPreference === InformationPreference.Object}
                                onChange={handleInformationPreferenceChange}
                                disabled={!isCustomisable}
                            />
                            <i className="form-icon"></i> Object
                        </label>
                        <label className="form-checkbox form-inline">
                            <input
                                id={InformationPreference.Setting}
                                type="checkbox"
                                name="preference"
                                value={InformationPreference.Setting}
                                checked={informationPreference === InformationPreference.Setting}
                                onChange={handleInformationPreferenceChange}
                                disabled={!isCustomisable}
                            />
                            <i className="form-icon"></i> Setting
                        </label>
                    </div>
                </div>
                <div>
                    <h2 id={CustomizationGroup.Presentation}>Presentation Customization</h2>
                </div>
                <div className="form-group">   
                    {/* Speed Customization */}
                    <div className="col-3 col-sm-12">
                        <label id={PresentationCustomization.Speed} className="form-label" htmlFor={Speed.ID}>Speed</label>
                    </div>
                    <div className="col-9 col-sm-12">
                        <div style={{ width: 'fit-content' }}>
                            <input
                                id={Speed.ID}
                                className="slider"
                                type="range"
                                min={Speed.MIN}
                                max={Speed.MAX}
                                step={Speed.STEP}
                                value={speed}
                                onChange={handleSpeedChange}
                                disabled={!isCustomisable}
                            />
                        </div>
                    </div>

                    {/* Language Customization
                    <div className="col-3 col-sm-12">
                        <label className="form-label" htmlFor="language">Language</label>
                    </div>
                    <div className="col-9 col-sm-12">
                        <Dropdown
                            options= {
                                [
                                    {value : "English"},
                                    {value : "Chinese"}
                                ]
                            }   
                            placeholder = "Select Language"
                            searchable = {true}
                            ariaLabel="Language selector dropdown"
                        />
                    </div> */}

                    {/* Voice Customization */}
                    <div className="col-3 col-sm-12">
                        <label id={PresentationCustomization.Voice} className="form-label" htmlFor="voice">Voice</label>
                    </div>
                    <div className="col-9 col-sm-12">
                        <label className="form-radio form-inline">
                            <input
                                id={Voice.Human}
                                type="radio"
                                name="voice"
                                value={Voice.Human}
                                checked={voice === Voice.Human}
                                onChange={handleVoiceChange}
                                disabled={!isCustomisable}
                            />
                            <i className="form-icon"></i> Human
                        </label>
                        <label className="form-radio form-inline">
                            <input
                                id={Voice.Synthesizer}
                                type="radio"
                                name="voice"
                                value={Voice.Synthesizer}
                                checked={voice === Voice.Synthesizer}
                                onChange={handleVoiceChange}
                                disabled={!isCustomisable}
                            />
                            <i className="form-icon"></i> Synthesizer
                        </label>
                    </div>

                    {/* Tone Customization */}
                    <div className="col-3 col-sm-12">
                        <label id={PresentationCustomization.Tone} className="form-label" htmlFor="tone">Tone</label>
                    </div>
                    <div className="col-9 col-sm-12">
                        <label className="form-radio form-inline">
                            <input
                                id={Tone.Monotonous}
                                type="radio"
                                name="tone"
                                value={Tone.Monotonous}
                                checked={tone === Tone.Monotonous}
                                onChange={handleToneChange}
                                disabled={!isCustomisable}
                            />
                            <i className="form-icon"></i> Monotonous
                        </label>
                        <label className="form-radio form-inline">
                            <input
                                id={Tone.Dynamic}
                                type="radio"
                                name="tone"
                                value={Tone.Dynamic}
                                checked={tone === Tone.Dynamic}
                                onChange={handleToneChange}
                                disabled={!isCustomisable}
                            />
                            <i className="form-icon"></i> Dynamic
                        </label>
                    </div>

                    {/* Gender Customization */}
                    <div className="col-3 col-sm-12">
                        <label id={PresentationCustomization.Gender} className="form-label" htmlFor="gender">Gender</label>
                    </div>
                    <div className="col-9 col-sm-12">
                        <label className="form-radio form-inline">
                            <input
                                id={Gender.Male}
                                type="radio"
                                name="gender"
                                value={Gender.Male}
                                checked={gender === Gender.Male}
                                onChange={handleGenderChange}
                                disabled={!isCustomisable}
                            />
                            <i className="form-icon"></i> Male
                        </label>
                        <label className="form-radio form-inline">
                            <input
                                id={Gender.Female}
                                type="radio"
                                name="gender"
                                value={Gender.Female}
                                checked={gender === Gender.Female}
                                onChange={handleGenderChange}
                                disabled={!isCustomisable}
                            />
                            <i className="form-icon"></i> Female
                        </label>
                    </div>

                    {/* Syntax Customization */}
                    <div className="col-3 col-sm-12">
                        <label id={PresentationCustomization.Syntax} className="form-label" htmlFor="syntax">Syntax</label>
                    </div>
                    <div className="col-9 col-sm-12">
                        <label className="form-radio form-inline">
                            <input
                                id={Syntax.Present}
                                type="radio"
                                name="syntax"
                                value={Syntax.Present}
                                checked={syntax === Syntax.Present}
                                onChange={handleSyntaxChange}
                                disabled={!isCustomisable}
                            />
                            <i className="form-icon"></i> Present
                        </label>
                        <label className="form-radio form-inline">
                            <input
                                id={Syntax.Past}
                                type="radio"
                                name="syntax"
                                value={Syntax.Past}
                                checked={syntax === Syntax.Past}
                                onChange={handleSyntaxChange}
                                disabled={!isCustomisable}
                            />
                            <i className="form-icon"></i> Past
                        </label>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CustomizationComponentForm;
