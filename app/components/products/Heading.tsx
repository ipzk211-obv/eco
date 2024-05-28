interface HeadingProps{
    title: string,
    center?: boolean
}
const Heading: React.FC<HeadingProps> = ({title, center}) => {
    return ( 
    <div className={center ? "text-center" : "tesxt-start"}>
        <h1 className="font-bold  text-2xl text-green">{title}</h1>
    </div>
     );
}
 
export default Heading;