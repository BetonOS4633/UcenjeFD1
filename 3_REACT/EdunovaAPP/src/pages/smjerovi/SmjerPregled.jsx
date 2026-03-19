import { useEffect, useState } from "react"
import SmjerService from "../../services/smjerovi/SmjerService"
import { Table } from "react-bootstrap"
import { GrValidate } from "react-icons/gr"
import { NumericFormat } from "react-number-format"
import FormatDatum from "../../components/FormatDatum"

export default function SmjerPregled() {

    const[smjerovi, setSmjerovi]=useState([])
    useEffect(()=>{
        ucitajSmjerove()
    },[])
    async function ucitajSmjerove() {
        await SmjerService.get().then((odgovor) => {
            setSmjerovi(odgovor.data)
        });
    }

    return (
    <>
        <Table>
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Trajanje</th>
                    <th>Cijena</th>
                    <th>Datum pokretanja</th>
                    <th>Aktiv</th>
                    <th>Akcija</th>

                </tr>
            </thead>
            <tbody>
                {smjerovi && smjerovi.map((smjer)=>(
                    <tr>
                        <td>{smjer.naziv}</td>
                        <td>{smjer.trajanje}</td>
                        <td><NumericFormat
                            value={smjer.cijena}
                            displayType={'text'}
                            thousandSeparator='.'
                            decimalSeparator=','
                            suffix={'€'}
                            decimalScale={2}
                            fixedDecimalScale
                        />
                        </td>
                        <td>
                            <FormatDatum datum={smjer.datumPokretanja}/>


                        </td>
                        <td>
                            <GrValidate
                                size={25}
                                color={smjer.aktivan?'green':'red'}
                                />
                            
                            </td>
                        <td></td>
                    </tr>
                ))}
            </tbody>
        </Table>

    </> 
    )
}

