import http from '../utils/request'
export function GeneratorProps(Comp) {
    return () => {
        return (
            <>
                <Comp http={http}></Comp>
            </>
        )
    }
}