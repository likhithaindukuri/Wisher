import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useWishesContext } from '../hooks/useWishesContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const WishForm = () => {
  const { dispatch } = useWishesContext();
  const { user } = useAuthContext();
  
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleTextChange = (e) => {
    const inputValue = e.target.value;

    // Check if the input value exceeds 40 characters
    if (inputValue.length > 40) {
      setError('Only 40 characters allowed');
    } else {
      setError(null);
    }

    // Update the state
    setText(inputValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in!');
      return;
    }

    const wish = {
      title,
      text,
      date,
      time,
      email,
    };

    try {
      const response = await fetch(`${API_URL}/api/wishes`, {
        method: 'POST',
        body: JSON.stringify(wish),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });

      const contentType = response.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');
      const json = isJson ? await response.json() : null;

      if (!response.ok) {
        if (response.status === 401) {
          setEmptyFields([]);
          setError('Your session has expired. Please log in again.');
          return;
        }

        setError(
          json?.error ||
          'Unable to add the wish. Please check your inputs and try again.',
        );
        setEmptyFields((json && json.emptyFields) || []);
        return;
      }

      setTitle('');
      setText('');
      setDate('');
      setTime('');
      setEmail('');
      setError(null);
      setEmptyFields([]);

      if (json?.date) {
        const formattedDate = new Date(json.date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
        json.date = formattedDate;
      }

      console.log('New wish added', json);
      dispatch({ type: 'CREATE_WISH', payload: json });
    } catch (error) {
      console.error('Error during adding the wish is:', error);
      setError(
        'An error occurred while adding the wish. Please ensure the server is running and try again.',
      );
    }
  };

  return (
    <div className={`wish-form-container ${error ? 'error-active' : ''}`}>
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a new Wish</h3>

        <label>Wishing Title:</label>
        <select
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={(emptyFields.includes('title') || error) ? 'error' : ''}
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
          onChange={handleTextChange}
          value={text}
          className={(emptyFields.includes('text') || error) ? 'error' : ''}
        />

        <div className='date-time-container'>
          <label>Date:</label>
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
            className={(emptyFields.includes('date') || error) ? 'error' : ''}
          />
          <label>Time:</label>
          <input
            type="time"
            onChange={(e) => setTime(e.target.value)}
            value={time}
            className={(emptyFields.includes('time') || error) ? 'error' : ''}
          />
        </div>

        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className={(emptyFields.includes('email') || error) ? 'error' : ''}
        />

        <button>Add Wish</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default WishForm;
