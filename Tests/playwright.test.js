const {test, expect} = require('@playwright/test');


test('HP title test', async({page}) => {
    await page.goto('https://www.saucedemo.com/');
    const title = await page.title();
    expect(title).toBe('Swag Labs');
});

test('HP login button visibuillity test', async({page}) => {
    await page.goto('https://www.saucedemo.com/');
    const loginbtn = await page.locator('login-button');
    expect(loginbtn).toBeVisible;
});


test('Login User', async({page}) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', "standard_user")
    await page.fill('#password', 'secret_sauce')
    await page.click('#login-button');
    
    const addToCartBtn  = await page.locator('add-to-cart-sauce-labs-backpack')
    expect(addToCartBtn).toBeVisible
});

test('Shoping Cart page', async({page}) =>{
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', "standard_user")
    await page.fill('#password', 'secret_sauce')
    await page.click('#login-button');

    await page.waitForTimeout(3000);

    await page.click('.shopping_cart_link');
    
    const checkoutBtn = page.locator('#checkout');
    expect(checkoutBtn).toBeVisible
})

test('Add item to cart', async({page}) =>{
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', "standard_user")
        await page.fill('#password', 'secret_sauce')
        await page.click('#login-button');

        await page.click('#add-to-cart-sauce-labs-backpack')
        await page.click('.shopping_cart_link')

        const addedElement = await page.textContent('.inventory_item_name')
        expect(addedElement).toContain('Sauce Labs Backpack')
})

test('Checkout complete', async({page}) =>{
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', "standard_user")
    await page.fill('#password', 'secret_sauce')
    await page.click('#login-button');

    await page.click('#add-to-cart-sauce-labs-backpack')
    await page.click('.shopping_cart_link')

    const addedElement = await page.textContent('.inventory_item_name')
    expect(addedElement).toContain('Sauce Labs Backpack')

    await page.click('#checkout');
    await page.fill('#first-name', 'Demo')
    await page.fill('#last-name', 'User')
    await page.fill('#postal-code', '1234')

    await page.click('#continue')
    await page.click('#finish')

    const finish = await page.textContent('.complete-header')
    expect(finish).toContain('Thank you for your order!');
})

test('Logout button working', async({page}) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', "standard_user")
    await page.fill('#password', 'secret_sauce')
    await page.click('#login-button');

    await page.click('#react-burger-menu-btn');

    await page.click('#logout_sidebar_link');

    const loginbtn = page.locator('login-button');
    expect(loginbtn).toBeVisible;
})


test('Add multiple items to cart', async({page}) =>{
    
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', "standard_user")
    await page.fill('#password', 'secret_sauce')
    await page.click('#login-button');

    await page.click('#add-to-cart-sauce-labs-backpack')
    await page.click('#add-to-cart-sauce-labs-bike-light')
    await page.click('#add-to-cart-sauce-labs-bolt-t-shirt')
    await page.click('.shopping_cart_link')

    const shopingCartElements = await page.textContent('#shopping_cart_container > a > span')
    expect(shopingCartElements).toContain('3')
})

test('Remove item from cart', async({page}) =>{
    
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', "standard_user")
    await page.fill('#password', 'secret_sauce')
    await page.click('#login-button');

    await page.click('#add-to-cart-sauce-labs-backpack')
    await page.click('#add-to-cart-sauce-labs-bike-light')
    await page.click('#add-to-cart-sauce-labs-bolt-t-shirt')
    await page.click('.shopping_cart_link')

    const shopingCartElements = await page.textContent('#shopping_cart_container > a > span')
    expect(shopingCartElements).toContain('3')

    await page.click('#remove-sauce-labs-backpack')

    const removedShopingCartElements = await page.textContent('#shopping_cart_container > a > span')
    expect(removedShopingCartElements).toContain('2')
})

test('Wright price test', async({page}) =>{
    
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', "standard_user")
    await page.fill('#password', 'secret_sauce')
    await page.click('#login-button');

    await page.click('#add-to-cart-sauce-labs-backpack')
    await page.click('#add-to-cart-sauce-labs-bike-light')
    await page.click('#add-to-cart-sauce-labs-bolt-t-shirt')
    await page.click('.shopping_cart_link')

    const shopingCartElements = await page.textContent('#shopping_cart_container > a > span')
    expect(shopingCartElements).toContain('3')

    await page.click('#checkout');
    await page.fill('#first-name', 'Demo')
    await page.fill('#last-name', 'User')
    await page.fill('#postal-code', '1234')
    await page.click('#continue')

    await page.waitForTimeout(3000);

    const totalPrice = await page.locator('//div[@data-test="total-label"]').textContent();
    expect(totalPrice).toBe('Total: $60.45')
})