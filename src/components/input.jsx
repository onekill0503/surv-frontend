const Input = (props) => {
const Icon = props.icon
  return (
    <div className="input-box-wrapper">
      <label>{props.name}</label>
      <div className="input flex justify-between">
        <input
          type={props.type || 'text'}
          className="flex-1"
          placeholder={props.placeholder || ''}
          defaultValue={props.defaultValue || ''}
          onChange={e => props.onChange(e.target.value)}
        />
        {Icon ? <Icon className="inline-block w-6 h-6 text-gray-500" /> : ''}
      </div>
    </div>
  );
};

export default Input;
