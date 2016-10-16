const eventil = new Eventil('FSyYFf3kdPU9TcntaWzopDAU')

async function main() {
  const me = await eventil.me()
  const presentations = me.presentations;

  new Vue({
    el: '#app',
    data: {
      message: 'Hello world',
      presentations: []
    },
    mounted() {
      this.presentations = presentations; 
    }
  })
}

main()

