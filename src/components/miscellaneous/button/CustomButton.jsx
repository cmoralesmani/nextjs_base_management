import { Button } from 'react-bootstrap'

export { CustomButton }

function CustomButton ({
  children,
  variant = 'primary',
  isSubmitting = false,
  icon,
  ...props
}) {
  return (
    <Button variant={variant} {...props} disabled={isSubmitting}>
      {isSubmitting
        ? (
        <span className="spinner-border spinner-border-sm me-1"></span>
          )
        : (
        <>{icon} </>
          )}
      {children}
    </Button>
  )
}
