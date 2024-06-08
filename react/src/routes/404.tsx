import { useLocation } from 'react-router-dom'

const NotFound = () => {
    const location = useLocation()

    return (
        <div className="min-h-96 w-full flex justify-center">
            <div className="text-center p-4 my-auto">
                <h1 className="text-5xl font-semibold mb-4">404</h1>
                <hr className='border border-primary/50 mb-4' />
                <h5 className="text-2xl mb-3">
                    La página
                    <span className='text-primary'>{" "}{location.pathname.slice(1)}</span> no existe.
                </h5>
            </div>
        </div>
    )
}

export default NotFound