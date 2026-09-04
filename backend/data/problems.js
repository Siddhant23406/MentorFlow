const problems = [
  {
    id: "two-sum",
    title: "Two Sum",
    description: "Given an array of integers and a target, return the indices of two numbers that add up to the target.",
    totalSteps: 3,
  },
  
  {
    id: "reverse-string",
    title: "Reverse String",
    description: "Given a string, return it with the characters in reverse order.",
    totalSteps: 2,
  },

  {
  id: "find-max",
  title: "Find Maximum",
  description: "Given an array of integers, return the largest number in the array.",
  totalSteps: 2,
  },

  {
  id: "valid-anagram",
  title: "Valid Anagram",
  description: "Given two strings, determine if the second is an anagram of the first.",
  totalSteps: 2,
},
{
  id: "palindrome-check",
  title: "Palindrome Check",
  description: "Given a string, determine if it reads the same forwards and backwards.",
  totalSteps: 2,
},
{
  id: "fizzbuzz",
  title: "FizzBuzz",
  description: "Print numbers 1 to n, but print 'Fizz' for multiples of 3, 'Buzz' for multiples of 5, and 'FizzBuzz' for multiples of both.",
  totalSteps: 2,
},
{
  id: "contains-duplicate",
  title: "Contains Duplicate",
  description: "Given an array of integers, determine if any value appears at least twice.",
  totalSteps: 2,
},
{
  id: "merge-sorted-arrays",
  title: "Merge Two Sorted Arrays",
  description: "Given two sorted arrays, merge them into a single sorted array.",
  totalSteps: 2,
},
{
  id: "move-zeroes",
  title: "Move Zeroes",
  description: "Given an array, move all zeroes to the end while maintaining the relative order of non-zero elements.",
  totalSteps: 2,
},
{
  id: "count-vowels",
  title: "Count Vowels",
  description: "Given a string, count the number of vowels it contains.",
  totalSteps: 2,
},
{
  id: "first-unique-char",
  title: "First Unique Character",
  description: "Given a string, find the index of the first character that does not repeat.",
  totalSteps: 2,
},

{
  id: "binary-search",
  title: "Binary Search",
  description: "Given a sorted array and a target value, return the index of the target, or -1 if not found.",
  totalSteps: 3,
},
{
  id: "valid-parentheses",
  title: "Valid Parentheses",
  description: "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input is valid (properly matched and nested).",
  totalSteps: 3,
},
{
  id: "missing-number",
  title: "Missing Number",
  description: "Given an array containing n distinct numbers from 0 to n, find the one number missing from the array.",
  totalSteps: 3,
},
{
  id: "single-number",
  title: "Single Number",
  description: "Given a non-empty array where every element appears twice except for one, find that single element.",
  totalSteps: 3,
},
{
  id: "intersection-of-arrays",
  title: "Intersection of Two Arrays",
  description: "Given two arrays, return their intersection — each element in the result should appear only once.",
  totalSteps: 3,
},

{
  id: "reverse-linked-list",
  title: "Reverse a Linked List",
  description: "Given the head of a singly linked list, reverse the list and return the new head.",
  totalSteps: 4,
},
{
  id: "max-subarray",
  title: "Maximum Subarray (Kadane's Algorithm)",
  description: "Given an integer array, find the contiguous subarray with the largest sum and return that sum.",
  totalSteps: 4,
},
{
  id: "climbing-stairs",
  title: "Climbing Stairs",
  description: "You are climbing a staircase with n steps. You can climb 1 or 2 steps at a time. How many distinct ways can you reach the top?",
  totalSteps: 4,
},
{
  id: "two-sum-sorted",
  title: "Two Sum II (Sorted Array)",
  description: "Given a sorted array and a target, find two numbers that add up to the target, using an approach that takes advantage of the sorted order.",
  totalSteps: 4,
}
  
];

function getProblemById(id) {
  return problems.find(p => p.id === id);
}

function getRandomProblem(){
  const index = Math.floor(Math.random() * problems.length)
  return problems[index] 
}

module.exports = { problems, getProblemById, getRandomProblem };
