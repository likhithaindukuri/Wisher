import { useState } from 'react';
import { useWishesContext } from '../hooks/useWishesContext';
import { useAuthContext } from '../hooks/useAuthContext';

const WishForm = () => {
  const { dispatch } = useWishesContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in!');
      return;
    }

    const wish = { title, load, date };

    try {
      const response = await fetch('/api/wishes', {
        method: 'POST',
        body: JSON.stringify(wish),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired, handle the error appropriately
          // For example, redirect to the login page or prompt the user to authenticate again
          setError('Your session has expired. Please log in again.');
        } else {
          setError(json.error);
          setEmptyFields(json.emptyFields);
        }
      } else {
        setTitle('');
        setLoad('');
        setDate('');
        setError(null);
        setEmptyFields([]);
        const formattedDate = new Date(json.date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
        json.date = formattedDate;
        console.log('New wish added', json);
        dispatch({ type: 'CREATE_WISH', payload: json });
      }
    } catch (error) {
      // Handle any other error that may occur during the API request
      setError('An error occurred while adding the wish. Please try again.');
    }
  };

  return (
    <div className="wish-form-container">
      <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Wish</h3>

      <label>Wishing Title:</label>

      <select
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      >
        <option value="">Select a title</option>
        <option value="BirthDay">BirthDay</option>
        <option value="Anniversary">Anniversary</option>
        <option value="Festival">Festival</option>
        <option value="Event">Event</option>
        <option value="Important events">Important events</option>
      </select>
      <label>Your message:</label>
      <input
        type="text"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />
      <label>Date:</label>
      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
        value={date}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Add Wish</button>
      {error && <div className="error">{error}</div>}
    </form>
    </div>
  );
};

export default WishForm

