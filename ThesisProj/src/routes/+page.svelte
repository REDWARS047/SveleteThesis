<script lang="ts">
    import { Section, Register } from 'flowbite-svelte-blocks';
    import { Button, Checkbox, Label, Input } from 'flowbite-svelte';
    import { goto } from '$app/navigation';
  
    function goToNextPage() {
      goto('/admin'); // Replace '/next-page' with your actual route
    }
  </script>
  
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white rounded-lg shadow-lg max-w-md w-full p-6 space-y-4 md:space-y-6 sm:p-8">
      <Register href="/">
        <svelte:fragment slot="top">
          <!-- You can add a logo or heading here if needed -->
        </svelte:fragment>
        <form class="flex flex-col space-y-6">
          <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Admin Log-In</h3>
          <Label class="space-y-2">
            <span>Your email</span>
            <Input type="email" name="email" placeholder="name@company.com" required />
          </Label>
          <Label class="space-y-2">
            <span>Your password</span>
            <Input type="password" name="password" placeholder="•••••" required />
          </Label>
          <div class="flex items-start">
            <Checkbox>Remember me</Checkbox>
            <a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Forgot password?</a>
          </div>
          <Button on:click={goToNextPage} type="button" class="w-full bg-red-500 text-black font-semibold py-2 px-4 rounded hover:bg-red-700">Sign in</Button>
        </form>
      </Register>
    </div>
  </div>
  