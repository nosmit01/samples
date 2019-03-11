export const bgColor = {
  data () {
    const color = this.project.categoryColor
    let gradient = ''

    if (color) {
      for (let i = 1; i < color.length; i++) {
        const value = parseInt(color[i], 16)
        const newValue = Math.ceil(Math.min(15, (value + (value / 3))))
        gradient += newValue.toString(16)
      }
      gradient = '#' + gradient
    }

    const styles = {
      badge: {
        background: `linear-gradient(77.71deg, ${color} -0.07%, ${gradient} 99.72%)`
      }
    }

    return {
      styles
    }
  }
}
