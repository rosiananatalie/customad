import React from "react";
import Dropdown from 'react-dropdown-aria'

function CustomizationComponentForm(props) {
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
                            <input type="radio" name="length" checked/><i className="form-icon"></i> Succinct
                        </label>
                        <label className="form-radio form-inline">
                            <input type="radio" name="length"/><i className="form-icon"></i> Verbose
                        </label>
                        <label className="form-radio form-inline">
                            <input type="radio" name="length"/><i className="form-icon"></i> Very Verbose
                        </label>
                    </div>

                    {/* Information Preference Customization */}
                    <div className="col-3 col-sm-12">
                        <label className="form-label" htmlFor="preference">Information Preference</label>
                    </div>
                    <div className="col-9 col-sm-12">
                        <label className="form-checkbox form-inline">
                            <input type="checkbox"/><i className="form-icon"></i> Activity
                        </label>
                        <label className="form-checkbox form-inline">
                            <input type="checkbox"/><i className="form-icon"></i> Person
                        </label>
                        <label className="form-checkbox form-inline">
                            <input type="checkbox"/><i className="form-icon"></i> Object
                        </label>
                        <label className="form-checkbox form-inline">
                            <input type="checkbox"/><i className="form-icon"></i> Setting
                        </label>
                    </div>

                    <div>
                        <h2>Presentation Customization</h2>
                    </div>

                    {/* Speed Customization */}
                    <div className="col-3 col-sm-12">
                        <label className="form-label" htmlFor="speed">Speed</label>
                    </div>
                    <div className="col-9 col-sm-12">
                        <input className="slider" type="range" id="speed" min="0" max="100"/>
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
                            <input type="radio" name="tone" checked/><i className="form-icon"></i> Monotonous
                        </label>
                        <label className="form-radio form-inline">
                            <input type="radio" name="tone"/><i className="form-icon"></i> Dynamic
                        </label>
                    </div>

                    {/* Voice Customization */}
                    <div className="col-3 col-sm-12">
                        <label className="form-label" htmlFor="voice">Voice</label>
                    </div>
                    <div className="col-9 col-sm-12">
                        <label className="form-radio form-inline">
                            <input type="radio" name="voice" checked/><i className="form-icon"></i> Human
                        </label>
                        <label className="form-radio form-inline">
                            <input type="radio" name="voice"/><i className="form-icon"></i> Synthesizer
                        </label>
                    </div>

                    {/* Gender Customization */}
                    <div className="col-3 col-sm-12">
                        <label className="form-label" htmlFor="gender">Gender</label>
                    </div>
                    <div className="col-9 col-sm-12">
                        <label className="form-radio form-inline">
                            <input type="radio" name="gender" checked/><i className="form-icon"></i> Male
                        </label>
                        <label className="form-radio form-inline">
                            <input type="radio" name="gender"/><i className="form-icon"></i> Female
                        </label>
                    </div>

                    {/* Syntax Customization */}
                    <div className="col-3 col-sm-12">
                        <label className="form-label" htmlFor="syntax">Syntax</label>
                    </div>
                    <div className="col-9 col-sm-12">
                        <label className="form-radio form-inline">
                            <input type="radio" name="syntax" checked/><i className="form-icon"></i> Past
                        </label>
                        <label className="form-radio form-inline">
                            <input type="radio" name="Syntax"/><i className="form-icon"></i> Present
                        </label>
                    </div>
                </div>

            
            </form>
        </div>
    )
}

export default CustomizationComponentForm