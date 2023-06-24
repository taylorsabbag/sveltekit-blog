---
title: 'Why You Should Learn FizzBuzz: The Quiet (In)Dignity of a Simple Interview Question'
description: An exploration of the best and possibly worst solutions for a child's game.
date: '2023-6-24'
categories:
    - javascript
    - fizzbuzz
    - interview questions
    - 
published: true
---

## Table of Contents

## FizzBuzz: The Silly, Children's Game

You may have heard of FizzBuzz. Or you may have heard of the FizzBuzz game. There are many variations, with different names, but the gist is this:

- In some turn order, start counting from 1.
- If your number to say is divisible by 3, say "Fizz" instead of the number (or some other silly word).
- If your number is divisible by 5, say "Buzz" instead.
- If your number is divisible by both 3 and 5, say "FizzBuzz".
- Otherwise, simply say your current number.

As a game, it's silly fun and a good icebreaker to break out at a social gathering where people don't mind being, well, silly. You can even speed up the counting for an extra challenge or impose a rule where every time a word response is required, the order of people counting is reversed.

## FizzBuzz: The Programming Interview Question

However, the much more interesting version is FizzBuzz, the interview question. As an interview question (mostly for junior developers), FizzBuzz is an elegant way of prodding at a developer's approach to solving simple problems in an efficient way. Because we're now exploring FizzBuzz as a coding problem, though, what might this look like in pseudocode? First, let's lay down some ground rules. You will be provided with a single parameter *n*, the number to count up to starting from 1, and you must provide an array where each entry is a string with either a number or the appropriate word response.

```js
// Declare fizzBuzz function with n as its parameter.
// Declare an empty array to hold our results.
// Loop from 1 to n and for each number:
 // If the number is divisible by 3, add 'Fizz' to the array.
 // Else if the number is divisible by 5, add 'Buzz' to the array.
 // Else if the number is divisible by 3 and 5, add 'FizzBuzz to the array'.
 // Else, add the current number, as a string, to the array.
// Return the resulting array.
```

The first thing you'd need to find out, if you haven't already, is what it means for the number to be divisible. In this case, it means that the remainder of the division of a number and another number is 0. Luckily, we have a handy operator for figuring that out: the Modulo (%) operator. So if this is true, `currentNumber % fizzBuzzNumber === 0` , then we have found an even divisible of a given fizzBuzzNumber. With that and the pseudocode in mind, the simplest answer is really straightforward:

```js
function fizzBuzz(n) {
 const result = []
 for (let i = 1; i <= n; i++) {
  if (i % 3 === 0) {
   result.push('Fizz')
  } else if (i % 5 === 0) {
   result.push('Buzz')
  } else if (i % 3 === 0 && i % 5 === 0) {
   result.push('FizzBuzz')
  } else {
   result.push(`${i}`)
  }
 }
 return result
}
```

In the rest of this article, we'll talk about how to improve this code to be simpler, easier to change/add to, and arguably more readable and generally "cleaner"; however, our initial issue is actually a bug. When we run into the first number divisible by both 3 and 5, the divisible by 3 if-check will happen first, add 'Fizz' to the array, and, because the rest of our checks are all else-if's or an else, it will stop there. Well, that's easy to fix. We just need to reorder our conditions so that the 'FizzBuzz' check occurs first.

```js
function fizzBuzz(n) {
 const result = []
 for (let i = 1; i <= n; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
   result.push('FizzBuzz')
   ...
```

Bim-bam-boom, we're done! And this works on a technical level for the challenge provided. But we have a lot of code repetition, so if we've made an error somewhere, or, critically, if I asked you to change or even add a new number-response pair, we'd have to change the numbers in each if-check. That's monotonous and annoying and could get out of hand if we had to add, say, 20 more number-response pairs.

## A Better Way

Our first order of business is to start reducing our calls to a certain method, .push. After all, why should we have to write a .push every time we add a new number-response pair. To do so, we can store a response string as a variable and push the response string to the array only when we've run through all our checks.

```js
// loop starts here
let string = ''
if (i % 3 === 0) string += 'Fizz'
if (i % 5 === 0) string += 'Buzz'
if (!string) string += i // checking to see if string is still empty
result.push(string)
// end of loop
```

And look at that, not only were we able to reduce the number of our .push method calls on the result array to one, but we were also able to get rid of the 'FizzBuzz' check **and** we got to simplify our if-checks to be one line operations, instead of multiple, nested else-if's. Adding more number-response pairs is now a lot easier.

```js
...
if (i % 7 === 0) string += 'Fuzz'
if (i % 10 === 0) string += 'Bizz'
...
```

But what if we abstract the `i % someNumber === 0` condition into its own function? While it won't necessarily save us character count, we'll save typing time by letting the intelligent auto-completion of our chosen IDE write the function name for us. We'll start by abstracting the function that will now check to see if a number is evenly divisible of another number.

```js
// will return true if the remainder of the division of the two numbers is 0
const isEvenDivisibleOf = (dividend, divisor) => dividend % divisor === 0
```

Slotting that in, we get:

```js
...
if (isEvenDivisibleOf(i, 7)) string += 'Fuzz'
if (isEvenDivisibleOf(i, 10)) string += 'Buzz'
...
```

Again, we're not saving character count, but our autocompletion works with functions, so we get to type less. But there's another hidden benefit here, and that is that our code becomes a tad more readable and more declarative.

## The "Best" Way

Honestly, you could (maybe even should) stop there, and most people wouldn't find too much issue. Heck, you probably could have stopped before we abstracted the isEvenDivisibleOf function. But we can utilize modern JavaScript built-in array methods to reduce this code even further without sacrificing *tooooooooo* much readability. I mention readability because some might suggest that what we're going to do next is harder to parse - I'd disagree, but it's worth noting.

Now, if you were writing a larger function with more complex operations and conditional logic, this might be a step too far. FizzBuzz, though, is a simple function with a limited use-case, so turning it into a one-liner is overall a pro (and kind of a flex too). To do this, we're going to utilize the Array constructor, the .fill method, the .map method, and the ternary conditional operator. Oh, and since we're going for a one-liner this time, we're going to utilize arrow-function syntax and their implicit returns. Let's go!

```js
const fizzBuzz = n => new Array(n).fill(0).map((_, i) => (isEvenDivisibleOf(++i, 3) ? 'Fizz' : '') + (isEvenDivisibleOf(i, 5) ? 'Buzz' : '') || `${i}`)
```

Ok, that's admittedly some dense code, so let's talk about what's happening. We start off by initializing and declaring our function using arrow function syntax. Since we have only a single parameter, we don't have to wrap it with () brackets. Then, we're directly (implicitly) returning the array we're creating, so we don't need the return keyword nor do we need to wrap the rest of our function in {} brackets.

Then, we construct a new Array, fill each slot in its indices with a 0, and run our .map function. That's where the real heart of our function occurs. We don't really care about the actual 0's - they're just placeholders. So we grab the index instead, do a little trick where we increment the index before checking for its divisibility of the target number (this is because we start our count at 1, not 0), and then add the appropriate word responses if the current index is divisible by the response-number.

If the index is divisible by either or all of the response-numbers, then the first half before the OR ( || ) comparison operator is true and the .map will return whatever words we've got and add it to the new array. If, however, the index is divisible by neither, then we proceed to the other half of our OR operator and return the current index as a string.

Come on, that's cool! Maybe it's dense, but you'd really only have to read it once and you'll understand it forever.

But it bears noting at this point that we've lost something in all our programming fury: how the heck do we maintain/add to this thing? Adding additional conditional checks would be tedious, sure, but even worse, it'd make a trivial program into a reading nightmare. So where do we go from here?

## Some Kind Of Way

I'm not going to lie to you: we're going off the rails. The stuff we're about to do...it's useful if you're going to extend/scale something, sure, but this is FizzBuzz. The only two typical responses are in the name.

Yet, what if? What if you were asked to add several more number-response pairs? So far, we've worked towards that goal in some sense, though in the last step, we sacrificed a bit of that power for (my own sense of) aesthetics.

Our next steps, then, will utilize the power of objects (you could also use a map) to allow us to reduce the lines we have to change in our code to make any kind of extension/change/addition to our fizzBuzz function.

```js
const fizzBuzzMap = {
 2: 'Schnozz',
 3: 'Fizz',
 5: 'Buzz',
 7: 'Fuzz',
 10: 'Bizz',
}

const fizzBuzz = n => {
 return new Array(n)
  .fill(0)
  .map((_,i) => {
   i++
   let result = ''
   for (let [number, response] of Object.entries(fizzBuzzMap)) {
    if (isEvenMultipleOf(i, number)) result += response
   }
   return result || `${i}`
  })
}
```

Wait, what just happened? Our function was down to a single line, and it has now suddenly exploded into more than we ever had, plus an extra function and an object. Bear with me: what do we do if we want to add or change a number-response pair? All we have to do is go to fizzBuzzMap and add or change one line. We've gained in lines of code, but we've also gained in the maintainability and extensibility/scalability of this function.

Again, very few are ever going to require that you go this far, and in doing so, you'll demonstrate one of two things: 1) you *get* FizzBuzz; or 2) you just overcomplicated a children's game, and by trying to be clever, you overengineered a solution to one of the world's simplest programming interview questions.

God damn, though, if that last version doesn't FizzBuzz the heck out of FizzBuzz. But it also might just FizzBuzz you right out the interview.
