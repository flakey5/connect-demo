import { connect } from '@arrowood.dev/socket';

async function doDemo() {
    // Establish the connection
    //  Not async, can return before the connection is opened
    const socket = connect('gopher.floodgap.com:70');
    
    // const socketInfo = await socket.opened;
    // console.log(`Socket opened, connected to remote address ${socketInfo.remoteAddress}`);

    // Get the WritableStream for the socket
    const writer = socket.writable.getWriter();
    
    // Fetch root path from the writer
    const encoder = new TextEncoder();
    const encoded = encoder.encode('/\r\n');

    // Write the path we're requesting to the WritableStream
    await writer.write(encoded);

    // Get the ReadableStream for the connection
    const readable = socket.readable.getReader();
    
    // Read the response back from the server
    const data = await readable.read();
    
    // Get the response as a string
    const decoder = new TextDecoder();
    const decoded = decoder.decode(data.value);

    // Log it
    console.log(decoded);

    // Close the connection
    await socket.close();
}

doDemo();
