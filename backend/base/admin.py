from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from base.models import CustomUser , Product, Review, Order, OrderItem,ShippingAddress
# Register your models here.



class AccountAdmin(UserAdmin):
    list_display=('public_key','username','email','is_admin','is_staff')
    search_fields =('username','public_key')
    readonly_fields=('id','public_key')

    filter_horizontal =()
    list_filter =()
    fieldsets=()

admin.site.register(CustomUser,AccountAdmin)
admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)