const FormWrap = ({children} : {children: React.ReactNode}) => {
    return ( 
    <div className="min-h-fit h-full flex items-center justify-center pb-12 pt-4">
        <div className="max-w-[650px] w-full flex flex-col gap-6 items-center shadow-xl shadow-slate-200 rounded-mb p-5 md:p-4">
            {children}
          </div>
    </div> );
}
 
export default FormWrap;