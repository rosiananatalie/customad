import React, { useCallback } from "react";
import { CustomizationGroup, ContentCustomization, PresentationCustomization, VideoLength, InformationPreference, Speed, Tone, Voice, Gender, Syntax } from "./DashboardComponent";

function CustomizationComponentForm({
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
        onAudioDescriptionIsEnabledChange(event.target.checked);
    }, [onAudioDescriptionIsEnabledChange]);

    const handleVideoLengthChange = useCallback((event) => {
        onVideoLengthChange(event.target.value);
    }, [onVideoLengthChange]);

    const handleInformationPreferenceChange = useCallback((event) => {
        onInformationPreferenceChange(informationPreference === event.target.value ? null : event.target.value);
    }, [informationPreference, onInformationPreferenceChange]);

    const handleSpeedChange = useCallback((event) => {
        onSpeedChange(Number(event.target.value));
    }, [onSpeedChange]);

    const handleToneChange = useCallback((event) => {
        onToneChange(event.target.value);
    }, [onToneChange]);

    const handleVoiceChange = useCallback((event) => {
        onVoiceChange(event.target.value);
    }, [onVoiceChange]);

    const handleGenderChange = useCallback((event) => {
        onGenderChange(event.target.value);
    }, [onGenderChange]);

    const handleSyntaxChange = useCallback((event) => {
        onSyntaxChange(event.target.value);
    }, [onSyntaxChange]);

    const audioDescriptionToggleLabel = isAudioDescriptionEnabled ? 'Audio Description ON' : 'Audio Description OFF';

    return (
        <div id="customization-form-component">
            <h1>Customization Setups</h1>
            <form className="form-horizontal">
                <div className="form-group">
                    <label className="form-switch">
                        <input
                            type="checkbox"
                            checked={isAudioDescriptionEnabled}
                            onChange={handleAudioDescriptionIsEnabledChange}
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
                        <label id={VideoLength.Succinct} className="form-radio form-inline">
                            <input
                                type="radio"
                                name="length"
                                value={VideoLength.Succinct}
                                checked={videoLength === VideoLength.Succinct}
                                onChange={handleVideoLengthChange}
                            />
                            <i className="form-icon"></i> Succinct
                        </label>
                        <label id={VideoLength.Verbose} className="form-radio form-inline">
                            <input
                                type="radio"
                                name="length"
                                value={VideoLength.Verbose}
                                checked={videoLength === VideoLength.Verbose}
                                onChange={handleVideoLengthChange}
                            />
                            <i className="form-icon"></i> Verbose
                        </label>
                        <label id={VideoLength.VeryVerbose} className="form-radio form-inline">
                            <input
                                type="radio"
                                name="length"
                                value={VideoLength.VeryVerbose}
                                checked={videoLength === VideoLength.VeryVerbose}
                                onChange={handleVideoLengthChange}
                            />
                            <i className="form-icon"></i> Very Verbose
                        </label>
                    </div>

                    {/* Information Preference Customization */}
                    <div className="col-3 col-sm-12">
                        <label id={ContentCustomization.InformationPreference} className="form-label" htmlFor="preference">Information Preference</label>
                    </div>
                    <div className="col-9 col-sm-12">
                        <label id={InformationPreference.Activity} className="form-checkbox form-inline">
                            <input
                                type="checkbox"
                                name="preference"
                                value={InformationPreference.Activity}
                                checked={informationPreference === InformationPreference.Activity}
                                onChange={handleInformationPreferenceChange}
                            />
                            <i className="form-icon"></i> Activity
                        </label>
                        <label id={InformationPreference.Person} className="form-checkbox form-inline">
                            <input
                                type="checkbox"
                                name="preference"
                                value={InformationPreference.Person}
                                checked={informationPreference === InformationPreference.Person}
                                onChange={handleInformationPreferenceChange}
                            />
                            <i className="form-icon"></i> Person
                        </label>
                        <label id={InformationPreference.Object} className="form-checkbox form-inline">
                            <input
                                type="checkbox"
                                name="preference"
                                value={InformationPreference.Object}
                                checked={informationPreference === InformationPreference.Object}
                                onChange={handleInformationPreferenceChange}
                            />
                            <i className="form-icon"></i> Object
                        </label>
                        <label id={InformationPreference.Setting} className="form-checkbox form-inline">
                            <input
                                type="checkbox"
                                name="preference"
                                value={InformationPreference.Setting}
                                checked={informationPreference === InformationPreference.Setting}
                                onChange={handleInformationPreferenceChange}
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

                    {/* Tone Customization */}
                    <div className="col-3 col-sm-12">
                        <label id={PresentationCustomization.Tone} className="form-label" htmlFor="tone">Tone</label>
                    </div>
                    <div className="col-9 col-sm-12">
                        <label id={Tone.Monotonous} className="form-radio form-inline">
                            <input
                                type="radio"
                                name="tone"
                                value={Tone.Monotonous}
                                checked={tone === Tone.Monotonous}
                                onChange={handleToneChange}
                            />
                            <i className="form-icon"></i> Monotonous
                        </label>
                        <label id={Tone.Dynamic} className="form-radio form-inline">
                            <input
                                type="radio"
                                name="tone"
                                value={Tone.Dynamic}
                                checked={tone === Tone.Dynamic}
                                onChange={handleToneChange}
                            />
                            <i className="form-icon"></i> Dynamic
                        </label>
                    </div>

                    {/* Voice Customization */}
                    <div className="col-3 col-sm-12">
                        <label id={PresentationCustomization.Voice} className="form-label" htmlFor="voice">Voice</label>
                    </div>
                    <div className="col-9 col-sm-12">
                        <label id={Voice.Human} className="form-radio form-inline">
                            <input
                                type="radio"
                                name="voice"
                                value={Voice.Human}
                                checked={voice === Voice.Human}
                                onChange={handleVoiceChange}
                            />
                            <i className="form-icon"></i> Human
                        </label>
                        <label id={Voice.Synthesizer} className="form-radio form-inline">
                            <input
                                type="radio"
                                name="voice"
                                value={Voice.Synthesizer}
                                checked={voice === Voice.Synthesizer}
                                onChange={handleVoiceChange}
                            />
                            <i className="form-icon"></i> Synthesizer
                        </label>
                    </div>

                    {/* Gender Customization */}
                    <div className="col-3 col-sm-12">
                        <label id={PresentationCustomization.Gender} className="form-label" htmlFor="gender">Gender</label>
                    </div>
                    <div className="col-9 col-sm-12">
                        <label id={Gender.Male} className="form-radio form-inline">
                            <input
                                type="radio"
                                name="gender"
                                value={Gender.Male}
                                checked={gender === Gender.Male}
                                onChange={handleGenderChange}
                            />
                            <i className="form-icon"></i> Male
                        </label>
                        <label id={Gender.Female} className="form-radio form-inline">
                            <input
                                type="radio"
                                name="gender"
                                value={Gender.Female}
                                checked={gender === Gender.Female}
                                onChange={handleGenderChange}
                            />
                            <i className="form-icon"></i> Female
                        </label>
                    </div>

                    {/* Syntax Customization */}
                    <div className="col-3 col-sm-12">
                        <label id={PresentationCustomization.Syntax} className="form-label" htmlFor="syntax">Syntax</label>
                    </div>
                    <div className="col-9 col-sm-12">
                        <label id={Syntax.Present} className="form-radio form-inline">
                            <input
                                type="radio"
                                name="syntax"
                                value={Syntax.Present}
                                checked={syntax === Syntax.Present}
                                onChange={handleSyntaxChange}
                            />
                            <i className="form-icon"></i> Present
                        </label>
                        <label id={Syntax.Past} className="form-radio form-inline">
                            <input
                                type="radio"
                                name="syntax"
                                value={Syntax.Past}
                                checked={syntax === Syntax.Past}
                                onChange={handleSyntaxChange}
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
