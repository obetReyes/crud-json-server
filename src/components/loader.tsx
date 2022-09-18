import React from 'react'
import './loader.css'


export const Loader: React.FC = () => {
        return (
            <article>
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </article>
        );
}