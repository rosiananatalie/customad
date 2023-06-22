import React from 'react'
import Dropdown from 'react-dropdown-aria'

function CustomizationComponent(props) {
    return (
        <div className='container'>
            <div className='columns'>
                <div className='column col-12'>
                    <h1>Customisation Setup</h1>
                </div>

                {/* Speed customization */}
                <div className='column col-5'>
                    <h2>Speed</h2>
                </div>
                <div className='column col-7'>
                    <input class="slider" type="range" min="0" max="100"/> 
                </div>

                {/* Language customization */}
                <div className='column col-5'>
                    <h2>Language</h2>
                </div>
                <div className='column col-7'>
                    <Dropdown
                        options= {
                            [
                                {value : "English"},
                                {value : "Chinese"}
                            ]
                        }   
                        placeholder = "Select Language.."
                        searchable = {true}
                        ariaLabel="Language selector dropdown"
                    />
                </div>

                {/* Tone customization */}
                <div className='column col-5'>
                    <h2>Tone</h2>
                </div>
                <div className='column col-7'>
                    <label class="form-radio form-inline">
                        <input type="radio" name="tone" checked/><i class="form-icon"></i> Monotonous
                    </label>
                    <label class="form-radio form-inline">
                        <input type="radio" name="tone"/><i class="form-icon"></i> Dynamic
                    </label>
                </div>

                {/* Voice customization */}
                <div className='column col-5'>
                    <h2>Voice</h2>
                </div>
                <div className='column col-7'>
                    <div class="form-group">
                        <label class="form-radio form-inline">
                            <input type="radio" name="voice" checked/><i class="form-icon"></i> Human
                        </label>
                        <label class="form-radio form-inline">
                            <input type="radio" name="voice"/><i class="form-icon"></i> Synthesizer
                        </label>
                    </div>
                </div>

                {/* Gender customization */}
                <div className='column col-5'>
                    <h2>Gender</h2>
                </div>
                <div className='column col-7'>
                    <div class="form-group">
                        <label class="form-radio form-inline">
                            <input type="radio" name="gender"checked/><i class="form-icon"></i> Male
                        </label>
                        <label class="form-radio form-inline">
                            <input type="radio" name="gender"/><i class="form-icon"></i> Female
                        </label>
                    </div>
                </div>
                
                {/* Sixth customization */}
                <div className='column col-5'>
                    <h2>Syntax</h2>
                </div>
                <div className='column col-7'>
                    <div class="form-group">
                        <label class="form-radio form-inline">
                            <input type="radio" name="syntax" checked/><i class="form-icon"></i> Past
                        </label>
                        <label class="form-radio form-inline">
                            <input type="radio" name="syntax"/><i class="form-icon"></i> Present
                        </label>
                    </div>
                </div>

                {/* Seventh customization */}
                <div className='column col-5'>
                    <h2>Length</h2>
                </div>
                <div className='column col-7'>
                    <div class="form-group">
                        <label class="form-radio form-inline">
                            <input type="radio" name="length" checked/><i class="form-icon"></i> Succinct
                        </label>
                        <label class="form-radio form-inline">
                            <input type="radio" name="length"/><i class="form-icon"></i> Verbose
                        </label>
                        <label class="form-radio form-inline">
                            <input type="radio" name="length" checked=""/><i class="form-icon"></i> Very Verbose
                        </label>
                    </div>
                </div>
                
                {/* Eight customization */}
                <div className='column col-5'>
                    <h2>Information Preference</h2>
                </div>
                <div className='column col-7'>
                    <div class="form-group">
                        <label class="form-checkbox">
                            <input type="checkbox"/>
                            <i class="form-icon"></i> Action
                        </label>

                        <label class="form-checkbox">
                            <input type="checkbox"/>
                            <i class="form-icon"></i> Person
                        </label>

                        <label class="form-checkbox">
                            <input type="checkbox"/>
                            <i class="form-icon"></i> Object
                        </label>

                        <label class="form-checkbox">
                            <input type="checkbox"/>
                            <i class="form-icon"></i> Setting
                        </label>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CustomizationComponent