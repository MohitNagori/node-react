import * as React from 'react';

export function withMouseHover<T>(Component: React.ComponentType<T>) {
    return (hocProps: Omit<T, 'isHovered'>) => {
        const [isHovered, setHover] = React.useState(false);

        const onMouseHover = () => {
            setHover(true)
        }

        const onMouseLeave = () => {
            setHover(false)
        }

        return (
            <span
                onMouseOver={onMouseHover}
                onMouseLeave={onMouseLeave}>
                <Component 
                    {...(hocProps as T)}
                    isHovered={isHovered} />
            </span>
        )
    }
}

