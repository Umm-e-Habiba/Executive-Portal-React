import React, { Component } from 'react';

/**
 * Renders the Footer
 */
class Footer extends Component {

    render() {
        return (
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            {`${new Date().getFullYear()}`} &copy; Attari Admin. All Rights Reserved. Developed with <i className='uil uil-heart text-danger font-size-12'></i> by Core Infinite.
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;