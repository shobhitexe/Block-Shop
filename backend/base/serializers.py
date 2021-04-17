from rest_framework import serializers
from .models import CustomUser, Product
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        # fields = ['username','public_key']
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model =Product
        fields = '__all__'


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CustomUser
        # fields = ['username','public_key']
        fields = '__all__'


    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)