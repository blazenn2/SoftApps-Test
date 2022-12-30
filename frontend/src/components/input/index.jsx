
const Input = (props) => {
    return (
        <label className="flex items-center md:space-x-4 space-x-2 w-full md:p-2 p-1">
            <span className="cursor-pointer flex ">{props.text}</span>
            <input type={props.type ? props.type : "text"} className={`${props.className} w-full border border-slate-400 focus:outline-none focus:border-slate-400 disabled:bg-gray-100 hover:bg-slate-100 p-1.5 px-5 rounded-md ${props.className}`} ref={props.reference} {...props} />
        </label>
    )
}

export default Input