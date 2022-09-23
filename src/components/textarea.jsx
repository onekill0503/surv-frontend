const Input = (props) => {
      return (
        <div className="input-box-wrapper">
          <label>{props.name}</label>
          <div className="input flex justify-between">
            <textarea
              type={props.type || 'text'}
              className="flex-1"
              placeholder={props.placeholder || ''}
              style={{height: '200px'}}
              defaultValue={props.defaultValue || ''}
              onChange={e => props.onChange(e.target.value)}
            />
          </div>
        </div>
      );
    };
    
    export default Input;
    