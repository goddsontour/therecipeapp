export function Button({ children, ...props }) {
    return <button {...props} className="button">{children}</button>;
  }
  export function Button({ children, onClick }) {
    return <button className="button" onClick={onClick}>{children}</button>;
}