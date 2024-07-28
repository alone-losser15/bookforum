// CPP program to find largest in an array 
// without conditional/bitwise/ternary/ operators 
// and without library functions. 
#include<iostream>
#include<cstring>
#include<sstream>
using namespace std; 
	
// If page found, updates the second chance bit to true 
static bool findAndUpdate(int x,int arr[], 
				bool second_chance[],int frames) 

{ 
	int i; 
	
	for(i = 0; i < frames; i++) 
	{ 
		
		if(arr[i] == x) 
		{ 
			// Mark that the page deserves a second chance 
			second_chance[i] = true; 
			
			// Return 'true', that is there was a hit 
			// and so there's no need to replace any page 
			return true; 
		} 
	} 
	
	// Return 'false' so that a page for replacement is selected 
	// as he reuested page doesn't exist in memory 
	return false; 
	
} 


// Updates the page in memory and returns the pointer 
static int replaceAndUpdate(int x,int arr[], 
			bool second_chance[],int frames,int pointer) 
{ 
	while(true) 
	{ 
		
		// We found the page to replace 
		if(!second_chance[pointer]) 
		{ 
			// Replace with new page 
			arr[pointer] = x; 
			
			// Return updated pointer 
			return (pointer + 1) % frames; 
		} 
		
		// Mark it 'false' as it got one chance 
		// and will be replaced next time unless accessed again 
		second_chance[pointer] = false; 
		
		//Pointer is updated in round robin manner 
		pointer = (pointer + 1) % frames; 
	} 
} 

static void printHitsAndFaults(string reference_string, 
											int frames) 
{ 
	int pointer, i, l=0, x, pf; 
	
	//initially we consider frame 0 is to be replaced 
	pointer = 0; 
	
	//number of page faults 
	pf = 0; 
	
	// Create a array to hold page numbers 
	int arr[frames];
	
	// No pages initially in frame, 
	// which is indicated by -1 
	memset(arr, -1, sizeof(arr)); 
	
	// Create second chance array. 
	// Can also be a byte array for optimizing memory 
	bool second_chance[frames];
	
	// Split the string into tokens, 
	// that is page numbers, based on space 
	
	string str[100];
	string word = ""; 
	for (auto x : reference_string) 
	{ 
		if (x == ' ') 
		{ 
			str[l]=word; 
			word = "";
			l++;
		} 
		else
		{ 
			word = word + x; 
		} 
	}
	str[l] = word;
	l++;
	// l=the length of array 
	
	for(i = 0; i < l; i++) 
	{ 
		x = stoi(str[i]);
		
		// Finds if there exists a need to replace 
		// any page at all 
		if(!findAndUpdate(x,arr,second_chance,frames)) 
		{ 
			// Selects and updates a victim page 
			pointer = replaceAndUpdate(x,arr, 
					second_chance,frames,pointer); 
			
			// Update page faults 
			pf++; 
		} 
	} 
	cout << "Total page faults were " << pf << "\n";
}

// Driver code
int main()
{ 
	string reference_string = ""; 
	int frames = 0; 

	// Test 1: 
	reference_string = "0 9 0 1 8 1 8 7 8 7 1 2 8 2 7 8 2 3 8 3"; 
	frames = 3; 
	
	// Output is 9 
	printHitsAndFaults(reference_string,frames); 
	 
} 

// This code is contributed by NikhilRathor
