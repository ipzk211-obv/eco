import getConsultById from "@/actions/getConsultById";
import Container from "@/app/components/Container";
import Appointment from "./Appointment";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface IPrams{
    consultId: string;
}


const ConsultingName  = async ({params}: {params: IPrams}) => {
    const consult = await getConsultById(params);
    
    const professions = consult?.profession.split(',').map(item => item.trim());
    const lines1 = consult?.description1.split(';').map(line => line.trim()).filter(line => line.length > 0);
    const lines2 = consult?.description2.split(';').map(line => line.trim()).filter(line => line.length > 0);
    const user = await getCurrentUser();

    return ( 
    <div className="text-green">
        <Container>
        <div className="flex md:block ">
            <div>
                <h1 className="font-bold text-xl my-5">Хто така {consult?.fullName}?</h1>
                {professions?.map((sentence, index) => (
                    <div key={index}>
                        <li>{sentence}</li>
                    </div>
                ))}
                <h1 className="font-bold text-xl my-5">Яка вартість послуг?</h1>
                <div>
                <p><span className="font-bold">Первинна консультація</span> - {consult?.initialConsult} грн (визначення потреби клієнта, висвітлення проблеми, висновок)</p> 
                <p><span className="font-bold">30-денна індивідуальна програма</span> - {consult?.monthConsult} грн (цю суму ви втрачаєте щомісяця, якщо випиваєте склянку латте щодня). Програма включає в себе:</p> 
                </div>
                {lines1?.map((sentence, index) => (
                        <div key={index}>
                            <p>{sentence}</p>
                        </div>
                    ))}
            </div>
            <div className="">
                <img src={consult?.image} alt="" />
            </div>
        </div>
   
        <h1 className="font-bold text-xl my-5">Також ми пропонуємо додаткові послуги, про які можна домовитись на етапі безкоштовної ознайомчої консультації:</h1>
               {lines2?.map((sentence, index) => (
                <div key={index}>
                    <li>{sentence}</li>
                </div>
            ))}
            <h1 className="font-bold text-xl my-5 text-center">Зміни чекають на Вас. Якщо не зараз, то коли?</h1>

            <Appointment consult={consult} user={user}/>
        </Container>
    </div>);
}
 
export default ConsultingName;