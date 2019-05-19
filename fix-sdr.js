#!/usr/bin/env node

console.log("Lets do this...\n")

let exec = require('child_process').exec

exec('lsusb | grep "Realtek"', function(err, stdout, stderr){
  if(err)
    console.log(stderr)

  parse(stdout)
})

function parse(data){
  let lines = data.split('\n')
  console.log("Located SDR:")
  for( line in lines ){
   
    tokens = lines[line].split(" ")
    if(typeof tokens[3] !== 'undefined'){

      console.log(lines[line])
      let usb_bus = tokens[1]
      let device = tokens[3]
      device = device.replace(":",'')

      console.log("Fixing permissions...")
      exec('sudo chmod 0666 /dev/bus/usb/'+usb_bus+'/'+device, (err, stdout, stderr)=>{

        console.log(err)
        console.log(stdout)
        console.log(stderr)
      })
    }
  }
}
