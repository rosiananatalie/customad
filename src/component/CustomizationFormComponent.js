import React from "react";
import Dropdown from 'react-dropdown-aria'

function CustomizationComponentForm(props) {
    return (
        <div>
            <h1>Customization Setups</h1>
            <form class="form-horizontal">
                <div>
                    <h2>Content Customization</h2>
                </div>

                <div class="form-group">
                    
                    {/* Length Customization */}
                    <div class="col-3 col-sm-12">
                        <label class="form-label" for="length">Length</label>
                    </div>
                    <div class="col-9 col-sm-12">
                        <label class="form-radio form-inline">
                            <input type="radio" name="length" checked/><i class="form-icon"></i> Succinct
                        </label>
                        <label class="form-radio form-inline">
                            <input type="radio" name="length"/><i class="form-icon"></i> Verbose
                        </label>
                        <label class="form-radio form-inline">
                            <input type="radio" name="length"/><i class="form-icon"></i> Very Verbose
                        </label>
                    </div>

                    {/* Information Preference Customization */}
                    <div class="col-3 col-sm-12">
                        <label class="form-label" for="preference">Information Preference</label>
                    </div>
                    <div class="col-9 col-sm-12">
                        <label class="form-checkbox form-inline">
                            <input type="checkbox"/><i class="form-icon"></i> Activity
                        </label>
                        <label class="form-checkbox form-inline">
                            <input type="checkbox"/><i class="form-icon"></i> Person
                        </label>
                        <label class="form-checkbox form-inline">
                            <input type="checkbox"/><i class="form-icon"></i> Object
                        </label>
                        <label class="form-checkbox form-inline">
                            <input type="checkbox"/><i class="form-icon"></i> Setting
                        </label>
                    </div>

                    <div>
                        <h2>Presentation Customization</h2>
                    </div>

                    {/* Speed Customization */}
                    <div class="col-3 col-sm-12">
                        <label class="form-label" for="speed">Speed</label>
                    </div>
                    <div class="col-9 col-sm-12">
                        <input class="slider" type="range" id="speed" min="0" max="100"/>
                    </div>

                    {/* Language Customization
                    <div class="col-3 col-sm-12">
                        <label class="form-label" for="language">Language</label>
                    </div>
                    <div class="col-9 col-sm-12">
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
                    <div class="col-3 col-sm-12">
                        <label class="form-label" for="tone">Tone</label>
                    </div>
                    <div class="col-9 col-sm-12">
                        <label class="form-radio form-inline">
                            <input type="radio" name="tone" checked/><i class="form-icon"></i> Monotonous
                        </label>
                        <label class="form-radio form-inline">
                            <input type="radio" name="tone"/><i class="form-icon"></i> Dynamic
                        </label>
                    </div>

                    {/* Voice Customization */}
                    <div class="col-3 col-sm-12">
                        <label class="form-label" for="voice">Voice</label>
                    </div>
                    <div class="col-9 col-sm-12">
                        <label class="form-radio form-inline">
                            <input type="radio" name="voice" checked/><i class="form-icon"></i> Human
                        </label>
                        <label class="form-radio form-inline">
                            <input type="radio" name="voice"/><i class="form-icon"></i> Synthesizer
                        </label>
                    </div>

                    {/* Gender Customization */}
                    <div class="col-3 col-sm-12">
                        <label class="form-label" for="gender">Gender</label>
                    </div>
                    <div class="col-9 col-sm-12">
                        <label class="form-radio form-inline">
                            <input type="radio" name="gender" checked/><i class="form-icon"></i> Male
                        </label>
                        <label class="form-radio form-inline">
                            <input type="radio" name="gender"/><i class="form-icon"></i> Female
                        </label>
                    </div>

                    {/* Syntax Customization */}
                    <div class="col-3 col-sm-12">
                        <label class="form-label" for="syntax">Syntax</label>
                    </div>
                    <div class="col-9 col-sm-12">
                        <label class="form-radio form-inline">
                            <input type="radio" name="syntax" checked/><i class="form-icon"></i> Past
                        </label>
                        <label class="form-radio form-inline">
                            <input type="radio" name="Syntax"/><i class="form-icon"></i> Present
                        </label>
                    </div>
                </div>

            
            </form>
        </div>
    )
}

export default CustomizationComponentForm