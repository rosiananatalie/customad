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
                    <input className="slider" type="range" min="0" max="100"/> 
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
                    <label className="form-radio form-inline">
                        <input type="radio" name="tone" checked/><i className="form-icon"></i> Monotonous
                    </label>
                    <label className="form-radio form-inline">
                        <input type="radio" name="tone"/><i className="form-icon"></i> Dynamic
                    </label>
                </div>

                {/* Voice customization */}
                <div className='column col-5'>
                    <h2>Voice</h2>
                </div>
                <div className='column col-7'>
                    <div className="form-group">
                        <label className="form-radio form-inline">
                            <input type="radio" name="voice" checked/><i className="form-icon"></i> Human
                        </label>
                        <label className="form-radio form-inline">
                            <input type="radio" name="voice"/><i className="form-icon"></i> Synthesizer
                        </label>
                    </div>
                </div>

                {/* Gender customization */}
                <div className='column col-5'>
                    <h2>Gender</h2>
                </div>
                <div className='column col-7'>
                    <div className="form-group">
                        <label className="form-radio form-inline">
                            <input type="radio" name="gender"checked/><i className="form-icon"></i> Male
                        </label>
                        <label className="form-radio form-inline">
                            <input type="radio" name="gender"/><i className="form-icon"></i> Female
                        </label>
                    </div>
                </div>
                
                {/* Sixth customization */}
                <div className='column col-5'>
                    <h2>Syntax</h2>
                </div>
                <div className='column col-7'>
                    <div className="form-group">
                        <label className="form-radio form-inline">
                            <input type="radio" name="syntax" checked/><i className="form-icon"></i> Past
                        </label>
                        <label className="form-radio form-inline">
                            <input type="radio" name="syntax"/><i className="form-icon"></i> Present
                        </label>
                    </div>
                </div>

                {/* Seventh customization */}
                <div className='column col-5'>
                    <h2>Length</h2>
                </div>
                <div className='column col-7'>
                    <div className="form-group">
                        <label className="form-radio form-inline">
                            <input type="radio" name="length" checked/><i className="form-icon"></i> Succinct
                        </label>
                        <label className="form-radio form-inline">
                            <input type="radio" name="length"/><i className="form-icon"></i> Verbose
                        </label>
                        <label className="form-radio form-inline">
                            <input type="radio" name="length" checked=""/><i className="form-icon"></i> Very Verbose
                        </label>
                    </div>
                </div>
                
                {/* Eight customization */}
                <div className='column col-5'>
                    <h2>Information Preference</h2>
                </div>
                <div className='column col-7'>
                    <div className="form-group">
                        <label className="form-checkbox">
                            <input type="checkbox"/>
                            <i className="form-icon"></i> Action
                        </label>

                        <label className="form-checkbox">
                            <input type="checkbox"/>
                            <i className="form-icon"></i> Person
                        </label>

                        <label className="form-checkbox">
                            <input type="checkbox"/>
                            <i className="form-icon"></i> Object
                        </label>

                        <label className="form-checkbox">
                            <input type="checkbox"/>
                            <i className="form-icon"></i> Setting
                        </label>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CustomizationComponent