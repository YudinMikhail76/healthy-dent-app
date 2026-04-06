export const useClickOutsideWithClasses = ({ 
    classesToCheck = [], 
    callback,
    propCheckRef
}) => {
    function handleClickOutside(e) {
        const hasMatchingClass = classesToCheck.some(
            (elClass) => e.target.classList.contains(elClass)
        )
        if (!hasMatchingClass && propCheckRef.value) {
            callback()
        }
    }
    
    onMounted(() => {
        document.addEventListener('click', handleClickOutside)
    })
    
    onBeforeUnmount(() => {
        document.removeEventListener('click', handleClickOutside)
    })
}