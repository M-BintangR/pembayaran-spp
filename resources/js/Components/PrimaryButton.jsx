export default function PrimaryButton({ type = 'submit', className = '', processing, children, onClick }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={
                `duration-300 bg-purple-700 hover:bg-purple-500 text-white md:py-2 md:rounded-md mr-2 md:px-3 ${processing && 'opacity-25'
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
