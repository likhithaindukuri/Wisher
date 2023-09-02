import { useState } from 'react';
import { useWishesContext } from '../hooks/useWishesContext';
import { useAuthContext } from '../hooks/useAuthContext';
import format from 'date-fns/format';

const WishForm = () => {
  const { dispatch } = useWishesContext();
  const { user } = useAuthContext();
  
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in!');
      return;
    }
    const formattedDate = format(new Date(`${date} ${time}`), 'yyyy-MM-dd HH:mm:ss');
    const wish = {
      title,
      load,
      date:formattedDate,
      time,
      email:user.email,
    };

    let newEmptyFields = [];

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
          setEmptyFields(newEmptyFields);
          setError('Your session has expired. Please log in again.');
        } else {
          setError(json.error);
          setEmptyFields(json.emptyFields);
        }
      } else {
        setTitle('');
        setLoad('');
        setDate('');
        setEmail('');
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
      <div className="date-time-container">
  <label>Date:</label>
  <input
    type="date"
    onChange={(e) => setDate(e.target.value)}
    value={date}
    className={emptyFields.includes('reps') ? 'error' : ''}
  />
  <label>Time:</label>
  <input
    type="time"
    onChange={(e) => setTime(e.target.value)}
    value={time}
    className={emptyFields.includes('time') ? 'error' : ''}
  />
</div>
      <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      <button>Add Wish</button>
      {error && <div className="error">{error}</div>}
    </form>
    </div>
  );
};

export default WishForm

