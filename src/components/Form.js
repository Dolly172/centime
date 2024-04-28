import React, {useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import {updateData, changeLanguage} from '../store/index';
import { useTranslation } from "react-i18next";

function Form(){
    
    const { data } = useSelector(state => state.chart);

    let dispatch = useDispatch();
    const languages = ['en', 'sp', 'it', 'fr'];
    const {t} = useTranslation('translation');

    const [inflow, setInflow] = useState(5000);
    const [outflow, setOutflow] = useState({
          Bills: 1000,
          Misc: 2000,
      });
    const [total, setTotal] = useState(outflow.Bills + outflow.Misc);
    const [remaining, setRemaining] = useState(inflow - total);
    const [edit, setEdit] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        
        if (name === 'inflow') {
          const newInflow = parseInt(value);
          setInflow(newInflow);          
          const updatedTotal = outflow.Bills + outflow.Misc;
          const updatedRemaining = newInflow - updatedTotal;
          setTotal(updatedTotal);
          setRemaining(updatedRemaining);
        } else if (name === 'Bills' || name === 'Misc') {
          const updatedOutflow = { ...outflow, [name]: parseInt(value) };
          setOutflow(updatedOutflow);
          const updatedTotal = updatedOutflow.Bills + updatedOutflow.Misc;
          setTotal(updatedTotal);
          const updatedRemaining = inflow - updatedTotal;
          setRemaining(updatedRemaining);
        }
      };
    
      const handleSubmit = () => {
        const newData = {
            inflow: inflow, 
            outflow: {
              Bills: outflow.Bills, 
              Misc: outflow.Misc,  
              Total: total, 
            },
            remaining: remaining, 
          };

        dispatch(updateData(newData));
        setEdit(false);
      };

      const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        dispatch(changeLanguage(selectedLanguage));
      };


    return(
        <>
        {edit ?
        <div className="container">
        <div>
            <label>{t('Total Income')}</label>
            <input name="inflow" value={inflow} type="number" onChange={handleInputChange} />
        </div>
        <div className="bills">
            <span>
            <label>{t('Bills')}</label>
            <input name="Bills" value={outflow.Bills} type="number" onChange={handleInputChange} />
            </span>
            <span className="misc">
            <label>{t('Miscelleneous')}</label>
            <input name="Misc" value={outflow.Misc} type="number" onChange={handleInputChange} />
            </span>
        </div>
        <div>
        <label>{t('Total Expense')}</label>
        <input name="Total" value={total} type="number" readOnly onChange={handleInputChange} />
        </div>
        <div>
            <label>{t('Remaining')}</label>
            <input name="remaining" value={remaining} type="number" readOnly onChange={handleInputChange} />
        </div>
        <div>
            <span className="submit">
                <button onClick={handleSubmit}>{t('Submit')}</button>
            </span>  
        </div>
        <div>
            <span>
            Languages: 
            <select onChange={handleLanguageChange}>
                {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                ))}
            </select>
            </span>
        </div>    
        </div>
    :
        <span className="edit" onClick={() => setEdit(true)}>Edit</span>
        }
        </>
        
    )
}

export default Form;




 