"use client";
import { useState } from "react";
import { NotOption } from './options/NotOption'
import { Mas } from './options/samples/Mas'
import { Mape } from './options/samples/Mape'
import { Emape } from './options/estimators/Emape'
import { Emas } from './options/estimators/Emas'

export function SelectToggle() {
    //Selección Tipo de Muestra
    const [select, setSelect] = useState({
        seleccion: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSelect(prevSelect => ({
            ...prevSelect,
            [name]: value,
        }));
    };

    const componentsMap = {
        mas: <Mas />,
        emas: <Emas />,
        mpe: <Mape />,
        empe: <Emape />,
    };

    const renderComponent = () => {
        return componentsMap[select.seleccion] || <NotOption />;
    };


    return (
        <div>
            <section className="container mx-auto bg-gray-100 w-2/6 h-6 my-6 rounded-md">
                <select
                    className="form-select-sm container mx-auto bg-gray-100 rounded-md"
                    id="seleccion"
                    name="seleccion"
                    value={select.seleccion}
                    onChange={handleChange}
                >
                    <option className="nav-link dropdown-toggle" value="">Seleccione qué le gustaría hacer</option>
                    <option className="nav-link dropdown-toggle" value="mas">Muestra Aleatoria Simple</option>
                    <option className="nav-link dropdown-toggle" value="emas">Estimadores de Muestra Aleatoria Simple</option>
                    <option className="nav-link dropdown-toggle" value="mpe">Muestra por Estrato</option>
                    <option className="nav-link dropdown-toggle" value="empe">Estimadores de Muestra por Estrato</option>
                </select>


            </section>

            {renderComponent()}
        </div>

    )
}
