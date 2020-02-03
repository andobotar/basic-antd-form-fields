import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Navbar.module.scss';

const Navbar: React.FC = () => {
    return (
        <nav className={classes.navbar}>
            <div className={classes.navItem}>
                <Link className={classes.navLink} to="/basic">
                    Basic form
                </Link>
            </div>
            <div className={classes.navItem}>
                <Link className={classes.navLink} to="/datetime">
                    Date and Time Picker
                </Link>
            </div>
            <div className={classes.navItem}>
                <Link className={classes.navLink} to="/extra">
                    Extra input
                </Link>
            </div>
        </nav>
    );
};

export default React.memo(Navbar);
