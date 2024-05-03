
import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import {updateData, changeLanguage} from '../store/index';
import { useTranslation } from "react-i18next";
import OutflowSection from "./OutflowSection";
import InflowSection from "./InflowSection";
import LanguageSelectorSection from "./LanguageSelectorSection";
import RemainingSection from "./RemainingSection";
import TotalExpenseSection from "./TotalExpenseSection";
import AddEntry from "./AddEntry";

function Form(){
    
    const { data } = useSelector(state => state.chart);
    let dispatch = useDispatch();
    const languages = ['en', 'sp', 'it', 'fr'];
    const {t} = useTranslation('translation');

    const { total: inflowTotal, ...inflowWithoutTotal } = data.inflow;
    const { total: outflowTotal, ...outflowWithoutTotal } = data.outflow;
    
    const [inflow, setInflow] = useState(inflowWithoutTotal);
    const [totalInflow, settotalInflow] = useState()
    const [outflow, setOutflow] = useState(outflowWithoutTotal);
    const [totalOutflow, settotalOutflow] = useState();
    const [remaining, setRemaining] = useState(totalInflow - totalOutflow);
    const [edit, setEdit] = useState(false);
    const [newEntry, setNewEntry] = useState({
      category: '',
      amount: '',
      type: 'inflow',
    });

    useEffect(() => {
      const totalInflow = Object.values(inflow).reduce((acc, curr) => acc + curr, 0);
      settotalInflow(totalInflow);
      const totalOutflow = Object.values(outflow).reduce((acc, curr) => acc + curr, 0);
      settotalOutflow(totalOutflow);
      setRemaining(totalInflow - totalOutflow);
    }, [inflow, outflow]);

    useEffect(() => {
      const { total: inflowTotal, ...inflowWithoutTotal } = data.inflow;
      const { total: outflowTotal, ...outflowWithoutTotal } = data.outflow;
      setInflow(inflowWithoutTotal);
      setOutflow(outflowWithoutTotal);
  }, [data]);

    const handleCategoryChange = (event) => {
      setNewEntry({ ...newEntry, category: event.target.value });
    };
  
    const handleAmountChange = (event) => {
      setNewEntry({ ...newEntry, amount: event.target.value });
    };

    const handleTypeChange = (event) => {
      setNewEntry({ ...newEntry, type: event.target.value });
    };

    const handleAddNewEntry = () => {
      const { category, amount, type } = newEntry;
      if (category && amount && type) {
        if (type === 'inflow') {
          setInflow(prevInflow => ({
            ...prevInflow,
            [category]: parseInt(amount),
          }));
        } else {
          setOutflow(prevOutflow => ({
            ...prevOutflow,
            [category]: parseInt(amount),
          }));
        }
        setNewEntry({ category: '', amount: '', type: 'inflow' });
      }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === 'inflow') {
          setInflow(parseInt(value));
      } else if (name in inflow) {
          setInflow(prevInflow => ({
              ...prevInflow,
              [name]: parseInt(value),
          }));
      } else if (name === 'bills' || name === 'misc') {
          setOutflow(prevOutflow => ({
              ...prevOutflow,
              [name]: parseInt(value),
          }));
      }
      };

      const handleDeleteEntry = (type, category) => {
        if (type === 'inflow') {
          setInflow(prevInflow => ({
            ...prevInflow,
            [category]: 0, 
          }));
          const updatedInflow = { ...inflow, [category]: 0 };
          dispatch(updateData({ inflow: updatedInflow }));
        } else {
          setOutflow(prevOutflow => ({
            ...prevOutflow,
            [category]: 0, 
          }));
          const updatedOutflow = { ...outflow, [category]: 0 };
          dispatch(updateData({ outflow: updatedOutflow }));
        }
      };
    
      const handleSubmit = () => {

        const updatedInflow = { ...inflow };
        const updatedOutflow = { ...outflow };

      // value of categories marked for deletion to zero
      Object.keys(inflow).forEach(category => {
        if (inflow[category] === 0) {
          delete updatedInflow[category];
        }
      });

      Object.keys(outflow).forEach(category => {
          if (outflow[category] === 0) {
            delete updatedOutflow[category];
          }
        });

        const totalInflow = Object.values(updatedInflow).reduce((acc, curr) => acc + curr, 0);
        const totalOutflow = Object.values(updatedOutflow).reduce((acc, curr) => acc + curr, 0);

        const updatedRemaining = totalInflow - totalOutflow;

        const newData = {
          inflow: { ...updatedInflow, total: totalInflow },
          outflow: { ...updatedOutflow, total: totalOutflow },
          remaining: updatedRemaining,
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
          <label className="headline">{t('Total Inflow')}</label>
          <input name='totalInflow' value={totalInflow} readOnly type="number" />
          </div>
        
        <InflowSection 
              inflow={inflow} 
              handleInputChange={handleInputChange} 
              handleDeleteEntry={handleDeleteEntry}
              />
        <OutflowSection 
              outflow={outflow} 
              handleInputChange={handleInputChange} 
              handleDeleteEntry={handleDeleteEntry}
              />
        
        <AddEntry 
              newEntry={newEntry} 
              handleCategoryChange={handleCategoryChange}
              handleAmountChange={handleAmountChange}
              handleTypeChange={handleTypeChange}
              handleAddNewEntry={handleAddNewEntry}
              />
        
        <TotalExpenseSection totalOutflow={totalOutflow}/>
        <RemainingSection remaining={remaining}/>
        
        <div>
            <span className="submit">
                <button data-testid="submit-button" onClick={handleSubmit}>{t('Submit')}</button>
            </span>  
        </div>
        <LanguageSelectorSection languages={languages} handleLanguageChange={handleLanguageChange}/>
        </div>
    :
        <span data-testid="edit-button" className="edit" onClick={() => setEdit(true)}>Edit</span>
        }
        </>
    )
}

export default Form;




 