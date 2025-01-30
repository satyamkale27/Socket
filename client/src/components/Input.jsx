export default function Input({ placeholder, handelInput, name }) {
  return (
    <div>
      <input placeholder={placeholder} onChange={handelInput} name={name} />
    </div>
  );
}
