import React from 'react';
import {
    useRouteMatch,
    NavLink,
    Route,
    useParams,
} from 'react-router-dom'
import { spring, AnimatedSwitch } from 'react-router-transition';

import './Blog.css';
import summary from '../blogs/summary.json';

function mapStyles(styles) {
    return {
        opacity: styles.opacity,
        transform: `scale(${styles.scale})`,
    };
}

// wrap the `spring` helper to use a bouncy config
function bounce(val) {
    return spring(val, {
        stiffness: 330,
        damping: 22,
    });
}

// child matches will...
const bounceTransition = {
    // start in a transparent, upscaled state
    atEnter: {
        opacity: 0,
        scale: 1.2,
    },
    // leave in a transparent, downscaled state
    atLeave: {
        opacity: bounce(0),
        scale: bounce(0.8),
    },
    // and rest at an opaque, normally-scaled state
    atActive: {
        opacity: bounce(1),
        scale: bounce(1),
    },
};


function BlogLanding(props) {
    let { path, url } = useRouteMatch();

    return (

        <AnimatedSwitch
            atEnter={bounceTransition.atEnter}
            atLeave={bounceTransition.atLeave}
            atActive={bounceTransition.atActive}
            mapStyles={mapStyles}
            className="route-wrapper"
        >
            <Route exact path={path}>
                <section className="blog-list-container">
                    <div className="inner-container">
                        {/* <h1 className="header-title">keep up to date with our progress</h1> */}
                        {
                            summary.blogs.map((b, index) => {
                                return (
                                    <div className="blog-entry">
                                        <div className="entry-number">
                                            {`0${index + 1}.`}
                                        </div>
                                        <div className="blog-summary" key={index}>
                                            <h2 className="summary-blog-title">{b.title}</h2>
                                            <h3 className="summary-subheader">{b.date}</h3>
                                            <NavLink to={`${url}/${index}`} className="read-more">read more</NavLink>
                                        </div>
                                    </div>

                                );
                            })
                        }
                    </div>
                </section>
            </Route>
            <Route path={`${path}/:index`}>
                <Blog />
            </Route>
        </AnimatedSwitch>
    );
}

function Blog(props) {
    let { index } = useParams();

    let blog = { ...summary.blogs[index] };
    blog.content = blog.content.split('\\n');

    return (
        <section className="inner-container">
            <h3 className="blog-date">{blog.date}</h3>
            <h1 className="blog-title">{`0${+index + 1}. ${blog.title}`}</h1>
            {
                blog.content.map(c => {
                    return <p className="content">{c}</p>;
                })
            }
        </section>
    )
}

export default BlogLanding;