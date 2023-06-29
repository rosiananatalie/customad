import React, { useCallback } from "react";
import { VideoLength, InformationPreference, Speed, Tone, Voice, Gender, Syntax } from "./DashboardComponent";

function CustomizationComponentForm({
    videoLength,
    informationPreference,
    speed,
    tone,
    voice,
    gender,
    syntax,
    onVideoLengthChange,
    onInformationPreferenceChange,
    onSpeedChange,
    onToneChange,
    onVoiceChange,
    onGenderChange,
    onSyntaxChange,
}) {
    const handleVideoLengthChange = useCallback((event) => {
        onVideoLengthChange(event.target.value);
    }, [onVideoLengthChange]);

    const handleInformationPreferenceChange = useCallback((event) => {
        onInformationPreferenceChange(event.target.value);
    }, [onInformationPreferenceChange]);

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

    return (
        <div>
            <h1>Customization Setups</h1>

            <form className="form-horizontal">
                <div>
                    <h2>Content Customization</h2>
                </div>
                <div className="form-group">
                    {/* Length Customization */}
                    <div className="col-3 col-sm-12">
                        <label className="form-label" htmlFor="length">Length</label>
                    </div>
                    <div className="col-9 col-sm-12">
                        <label className="form-radio form-inline">
                            <input
                                type="radio"
                                name="length"
                                value={VideoLength.Succinct}
                                checked={videoLength === VideoLength.Succinct}
                                onChange={handleVideoLengthChange}
                            />
                            <i className="form-icon"></i> Succinct
                        </label>
                        <label className="form-radio form-inline">
                            <input
                                type="radio"
                                name="length"
                                value={VideoLength.Verbose}
                                checked={videoLength === VideoLength.Verbose}
                                onChange={handleVideoLengthChange}
                            />
                            <i className="form-icon"></i> Verbose
                        </label>
                        <label className="form-radio form-inline">
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
                        <label className="form-label" htmlFor="preference">Information Preference</label>
                    </div>
                    <div className="col-9 col-sm-12">
                        <label className="form-radio form-inline">
                            <input
                                type="radio"
                                name="preference"
                                value={InformationPreference.Activity}
                                checked={informationPreference === InformationPreference.Activity}
                                onChange={handleInformationPreferenceChange}
                            />
                            <i className="form-icon"></i> Activity
                        </label>
                        <label className="form-radio form-inline">
                            <input
                                type="radio"
                                name="preference"
                                value={InformationPreference.Person}
                                checked={informationPreference === InformationPreference.Person}
                                onChange={handleInformationPreferenceChange}
                            />
                            <i className="form-icon"></i> Person
                        </label>
                        <label className="form-radio form-inline">
                            <input
                                type="radio"
                                name="preference"
                                value={InformationPreference.Object}
                                checked={informationPreference === InformationPreference.Object}
                                onChange={handleInformationPreferenceChange}
                            />
                            <i className="form-icon"></i> Object
                        </label>
                        <label className="form-radio form-inline">
                            <input
                                type="radio"
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
                    <h2>Presentation Customization</h2>
                </div>

                <div className="form-group">   
                    

                    {/* Speed Customization */}
                    <div className="col-3 col-sm-12">
                        <label className="form-label" htmlFor="speed">Speed</label>
                    </div>
                    <div className="col-9 col-sm-12">
                        <input
                            className="slider"
                            type="range"
                            id="speed"
                            min={Speed.MIN}
                            max={Speed.MAX}
                            step={Speed.STEP}
                            value={speed}
                            onChange={handleSpeedChange}
                        />
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
                        <label className="form-label" htmlFor="tone">Tone</label>
                    </div>
                    <div className="col-9 col-sm-12">
                        <label className="form-radio form-inline">
                            <input
                                type="radio"
                                name="tone"
                                value={Tone.Monotonous}
                                checked={tone === Tone.Monotonous}
                                onChange={handleToneChange}
                            />
                            <i className="form-icon"></i> Monotonous
                        </label>
                        <label className="form-radio form-inline">
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
                        <label className="form-label" htmlFor="voice">Voice</label>
                    </div>
                    <div className="col-9 col-sm-12">
                        <label className="form-radio form-inline">
                            <input
                                type="radio"
                                name="voice"
                                value={Voice.Human}
                                checked={voice === Voice.Human}
                                onChange={handleVoiceChange}
                            />
                            <i className="form-icon"></i> Human
                        </label>
                        <label className="form-radio form-inline">
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
                        <label className="form-label" htmlFor="gender">Gender</label>
                    </div>
                    <div className="col-9 col-sm-12">
                        <label className="form-radio form-inline">
                            <input
                                type="radio"
                                name="gender"
                                value={Gender.Male}
                                checked={gender === Gender.Male}
                                onChange={handleGenderChange}
                            />
                            <i className="form-icon"></i> Male
                        </label>
                        <label className="form-radio form-inline">
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
                        <label className="form-label" htmlFor="syntax">Syntax</label>
                    </div>
                    <div className="col-9 col-sm-12">
                        <label className="form-radio form-inline">
                            <input
                                type="radio"
                                name="syntax"
                                value={Syntax.Past}
                                checked={syntax === Syntax.Past}
                                onChange={handleSyntaxChange}
                            />
                            <i className="form-icon"></i> Past
                        </label>
                        <label className="form-radio form-inline">
                            <input
                                type="radio"
                                name="syntax"
                                value={Syntax.Present}
                                checked={syntax === Syntax.Present}
                                onChange={handleSyntaxChange}
                            />
                            <i className="form-icon"></i> Present
                        </label>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CustomizationComponentForm;
