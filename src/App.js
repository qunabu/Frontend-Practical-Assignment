import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrencies } from "./redux/actions";
import Currencies from "./components/Currencies";
import "./App.css";

/**
 * The App is using
 * - redux for storing the global data, Currencies data 
 * - state for favourites  codes of the Currencies
 *
 * It could use redux for open keys as well,
 * but I've decided that this is local state
 */

function App(props) {
  /** contains array of opened Currencies */
  const [favouritesCurrencies, setFavouritesCurrencies] = useState(['EUR', 'USD', 'GBP']);
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");
  const dispatch = useDispatch();
  /** get data from the redux */
  const data = useSelector(state => state);

  /** show/hide Currency by row */
  const addCurrency = code => {
    if (!favouritesCurrencies.includes(code)) {
      setFavouritesCurrencies([...favouritesCurrencies, code]);
    }
  };

  const removeCurrency = code => {
    setFavouritesCurrencies(
      favouritesCurrencies.filter(fCode => fCode !== code)
    );
  };

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  if (data.loading) {
    return <main className="loading">loading...</main>;
  }

  if (data.error) {
    return (
      <main className="error">
        <h2>Error</h2> <pre>{JSON.stringify(data.error)}</pre>
      </main>
    );
  }

  return (
    <main>
      <div className="container">
        <h1>Yours favourites currencies list</h1>
        <form>
          <select
            name="currency"
            value={selectedCurrency}
            onChange={e => setSelectedCurrency(e.target.value)}
          >
            {data.currencies.map(currency => (
              <option
                key={currency.code}
                value={currency.code}
                disabled={favouritesCurrencies.includes(currency.code)}
              >
                {currency.code} - {currency.currency}
              </option>
            ))}
          </select>
          <button
            title="add currency to your list"
            type="button"
            className="icon add"
            onClick={() => addCurrency(selectedCurrency)}
          ></button>
        </form>
        {favouritesCurrencies.length ? <hr /> : <p>Use the form above to add your first favourie currency</p>}
        <Currencies
          items={data.currencies.filter(currency =>
            favouritesCurrencies.includes(currency.code)
          )}
          onDeleteCode={code => removeCurrency(code)}
          onDeleteAll={() => setFavouritesCurrencies([])}
        />
      </div>
    </main>
  );
}

export default App;
