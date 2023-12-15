# READ ME

This is a basic frontend using [bun](https://bun.sh/) and React. It simply can
make a request to a server with a list of tokens and display the result of the
tags that it gets from the Python backend.

You will notice a file `App2.tsx` and `App.tsx`. Both are quick drafts of the
same type of functionality. `App2.tsx` is more complex, and more complete, and
the one in use. To finis this frontend properly, you will need to be careful
of a couple things:

1. Custom input (it is complex it get this correct, and if you don't care about
   things like displaying tokens on the frontend, maybe you don't care about this).
   You may want to in essence 'filter out punctuation' and then tokenize on spaces.
   To actually render the marked tokens in the input (since this input is highly
   custom) you would need to keep track of this.

2. Handle the loading states properly for rendering the tagged tokens while the
   tagging is happening on the server.

3. Handle the error states properly for rendering the tagged tokens when the
   server returns an error.

4. Fix the labels for the tagged tokens to have something like tooltips, so
   it is explicitly clear how the tokens are being tagged.

5. (Optional) File upload on the client, where given a file, will call the server.
   Could be cool where you handle the file transfer/data format over the network,
   and have students implement the server side.

6. (Optional) A place where you can inspect data on the frontend, something
   equivalent to "print out some samples from the data" but with all the nice
   color formatting that you take care of in step 4.

These are some random ideas but some of them would probably be necessary to make
this frontend usable for students.
